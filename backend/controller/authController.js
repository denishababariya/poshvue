const jwt = require('jsonwebtoken');
const { User } = require('../model');
const twilio = require('twilio');

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_REGISTRATION_TOKEN = process.env.ADMIN_REGISTRATION_TOKEN;

// Initialize Twilio client (only if credentials are provided)
let twilioClient = null;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_ACCOUNT_SID !== 'YOUR_TWILIO_ACCOUNT_SID' && TWILIO_AUTH_TOKEN !== 'YOUR_TWILIO_AUTH_TOKEN') {
  try {
    twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    console.log('Twilio client initialized successfully');
  } catch (err) {
    console.error('Failed to initialize Twilio client:', err.message);
  }
} else {
  console.warn('Twilio credentials not configured. SMS features will be disabled.');
}

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
}

// Helper function to format phone number to E.164 format
function formatPhoneNumber(phone) {
  if (!phone) return null;
  
  // Remove all non-numeric characters
  let cleaned = phone.replace(/\D/g, '');
  
  // If it already starts with +, remove it for processing
  if (phone.startsWith('+')) {
    cleaned = phone.substring(1).replace(/\D/g, '');
  }
  
  // If 10 digits (Indian format), add country code 91
  if (cleaned.length === 10) {
    return '+91' + cleaned;
  }
  // If 12 digits (country code + number), add +
  else if (cleaned.length === 12) {
    return '+' + cleaned;
  }
  // If already has country code (more than 10, less than 12)
  else if (cleaned.length > 10 && cleaned.length < 15) {
    return '+' + cleaned;
  }
  
  return null; // Invalid format
}

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role = 'user', adminToken } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'Name, email, password, and phone are required' });
    }

    // Format phone number to E.164 format
    const formattedPhone = formatPhoneNumber(phone);
    if (!formattedPhone) {
      return res.status(400).json({ message: 'Invalid phone number format. Please enter 10 digits or with country code.' });
    }

    // Only allow admin registration with valid admin token
    if (role === 'admin') {
      if (!ADMIN_REGISTRATION_TOKEN || adminToken !== ADMIN_REGISTRATION_TOKEN) {
        return res.status(403).json({ message: 'Admin registration not allowed' });
      }
    } else {
      // Ensure regular users cannot register as admin
      if (role && role !== 'user') {
        return res.status(403).json({ message: 'Invalid role for registration' });
      }
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const phoneExists = await User.findOne({ phone: formattedPhone });
    if (phoneExists) return res.status(409).json({ message: 'Phone number already registered' });

    const user = await User.create({ name, email, password, phone: formattedPhone, role });
    const token = signToken(user);

    console.log('User registered:', { id: user._id, email: user.email, phone: user.phone, role: user.role });

    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    return res.status(201).json({ user: user.toJSONSafe(), token });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role: requestedRole } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    // Role-based validation: if requestedRole is provided, validate it matches user role
    if (requestedRole && user.role !== requestedRole) {
      return res.status(403).json({ 
        message: `Access denied. This account is for ${user.role === 'admin' ? 'admin' : 'user'} access only.` 
      });
    }

    const token = signToken(user);
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    return res.json({ user: user.toJSONSafe(), token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = async (_req, res) => {
  try {
    res.clearCookie('token');
    return res.json({ message: 'Logged out' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// Change password for logged-in user
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    console.log('Change-password request for user:', req.user.id);

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: 'Current password and new password are required' });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: 'New password must be at least 6 characters' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    if (currentPassword === newPassword) {
      return res
        .status(400)
        .json({ message: 'New password must be different from current password' });
    }

    user.password = newPassword; // will be hashed by pre-save hook
    await user.save();

    return res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Change password error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Forgot Password - Send OTP via SMS
exports.forgotPassword = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    // Format phone number to E.164 format
    const formattedPhone = formatPhoneNumber(phone);
    if (!formattedPhone) {
      return res.status(400).json({ message: 'Invalid phone number format. Please enter 10 digits or with country code.' });
    }

    // Try to find user with formatted phone first, then with unformatted (for old users)
    let user = await User.findOne({ phone: formattedPhone });
    
    // If not found with formatted, try with the original input (for old users in DB)
    if (!user) {
      // Remove country code from formatted to search for old format
      const unformattedPhone = formattedPhone.replace(/\D/g, '').slice(-10);
      user = await User.findOne({ phone: unformattedPhone });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found with this phone number' });
    }

    // Log user data
    console.log('Forgot Password Request - User Data:', {
      userId: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });

    // Update phone to include country code if it doesn't already
    if (!user.phone.startsWith('+')) {
      user.phone = formattedPhone;
      console.log('Updated phone number to:', user.phone);
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    // Save OTP and expiry to user
    user.resetOTP = otp;
    user.resetOTPExpires = otpExpires;
    await user.save();

    console.log('OTP Generated and Saved:', {
      userId: user._id,
      otp: otp,
      otpExpires: otpExpires,
      phone: user.phone
    });

    // Send OTP via Twilio SMS (if configured correctly)
    const isValidTwilioNumber = TWILIO_PHONE_NUMBER && 
                                 TWILIO_PHONE_NUMBER.startsWith('+') && 
                                 TWILIO_PHONE_NUMBER.length > 10 &&
                                 !TWILIO_PHONE_NUMBER.includes('YOUR_ACTUAL_TWILIO_NUMBER') &&
                                 !TWILIO_PHONE_NUMBER.includes('YOUR_TWILIO');

    if (twilioClient && isValidTwilioNumber) {
      try {
        console.log('Attempting to send SMS:', {
          from: TWILIO_PHONE_NUMBER,
          to: user.phone,
          body: `Your password reset OTP is: ${otp}. Valid for 10 minutes.`
        });

        await twilioClient.messages.create({
          body: `Your password reset OTP is: ${otp}. Valid for 10 minutes.`,
          from: TWILIO_PHONE_NUMBER,
          to: user.phone,
        });

        console.log('SMS sent successfully to:', user.phone);

        return res.json({ 
          message: 'OTP sent successfully to your phone',
          email: user.email 
        });
      } catch (smsError) {
        console.error('SMS sending failed:', smsError.message);
        console.error('SMS Error Details:', {
          code: smsError.code,
          status: smsError.status,
          details: smsError.details
        });
        
        // Still return OTP in development mode for testing
        if (process.env.NODE_ENV === 'development') {
          console.warn('SMS failed, but returning OTP for development:', otp);
          return res.json({
            message: 'OTP generated (SMS failed - check Twilio config)',
            email: user.email,
            debug_otp: otp,
            error: smsError.message
          });
        }
        
        // Return error details to help debug
        return res.status(500).json({ 
          message: 'Failed to send OTP. Please check your Twilio configuration.',
          error: smsError.message,
          hint: 'Make sure TWILIO_PHONE_NUMBER in .env is a valid Twilio phone number starting with +'
        });
      }
    } else {
      // Fallback: OTP saved but SMS not sent (for testing/configuration issues)
      console.warn('Twilio SMS not configured. OTP saved but not sent.');
      console.warn('TWILIO_PHONE_NUMBER:', TWILIO_PHONE_NUMBER || 'NOT SET');
      console.warn('Twilio Client:', twilioClient ? 'Initialized' : 'NOT INITIALIZED');
      console.warn('OTP for testing:', otp);

      return res.json({
        message: 'OTP has been generated and saved (SMS not configured)',
        email: user.email,
        note: 'Contact admin to configure Twilio SMS service',
        debug_otp: process.env.NODE_ENV === 'development' ? otp : undefined,
        hint: 'Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER in backend/.env'
      });
    }
  } catch (err) {
    console.error('Forgot password error:', err);
    console.error('Error Details:', {
      message: err.message,
      code: err.code,
      status: err.status,
      stack: err.stack
    });
    return res.status(500).json({ 
      message: 'Server error',
      error: err.message 
    });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ message: 'Phone number and OTP are required' });
    }

    // Format phone number to E.164 format
    const formattedPhone = formatPhoneNumber(phone);
    if (!formattedPhone) {
      return res.status(400).json({ message: 'Invalid phone number format. Please enter 10 digits or with country code.' });
    }

    // Try to find user with formatted phone first, then with unformatted (for old users)
    let user = await User.findOne({ phone: formattedPhone });
    
    // If not found with formatted, try with the original input (for old users in DB)
    if (!user) {
      const unformattedPhone = formattedPhone.replace(/\D/g, '').slice(-10);
      user = await User.findOne({ phone: unformattedPhone });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found with this phone number' });
    }

    // Log OTP verification attempt
    console.log('OTP Verification Request:', {
      userId: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      otpProvided: otp,
      otpStored: user.resetOTP
    });

    // Update phone to include country code if it doesn't already
    if (!user.phone.startsWith('+')) {
      user.phone = formattedPhone;
      console.log('Updated phone number to:', user.phone);
    }

    // Check if OTP exists and hasn't expired
    if (!user.resetOTP || !user.resetOTPExpires) {
      return res.status(400).json({ message: 'OTP not requested. Please request a new OTP.' });
    }

    if (new Date() > user.resetOTPExpires) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new OTP.' });
    }

    if (user.resetOTP !== otp) {
      console.log('OTP Mismatch:', {
        userId: user._id,
        expected: user.resetOTP,
        received: otp
      });
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Log successful OTP verification
    console.log('OTP Verified Successfully:', {
      userId: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone
    });

    // OTP is valid - Generate temporary reset token
    const resetToken = jwt.sign({ id: user._id, type: 'reset' }, JWT_SECRET, { expiresIn: '15m' });

    // Save the updated phone with country code
    await user.save();

    return res.json({ 
      message: 'OTP verified successfully',
      resetToken,
      email: user.email
    });
  } catch (err) {
    console.error('Verify OTP error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Reset Password using reset token
exports.resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword, confirmPassword } = req.body;

    if (!resetToken || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'Reset token and passwords are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Verify reset token
    let decoded;
    try {
      decoded = jwt.verify(resetToken, JWT_SECRET);
      if (decoded.type !== 'reset') {
        return res.status(400).json({ message: 'Invalid reset token' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Reset token is invalid or expired' });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update password and clear OTP
    user.password = newPassword;
    user.resetOTP = undefined;
    user.resetOTPExpires = undefined;
    await user.save();

    return res.json({ message: 'Password reset successfully. Please login with your new password.' });
  } catch (err) {
    console.error('Reset password error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};