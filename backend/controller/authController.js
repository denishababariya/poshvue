const jwt = require('jsonwebtoken');
const { User } = require('../model');

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_REGISTRATION_TOKEN = process.env.ADMIN_REGISTRATION_TOKEN;

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
}

exports.register = async (req, res) => {
  try {
    const { name, email, password, role = 'user', adminToken } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, password required' });
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

    const user = await User.create({ name, email, password, role });
    const token = signToken(user);

    console.log('User registered:', { id: user._id, email: user.email, role: user.role });

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