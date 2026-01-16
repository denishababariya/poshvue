const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  register,
  login,
  logout,
  me,
  changePassword,
  forgotPassword,
  verifyOTP,
  resetPassword,
} = require('../controller/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', auth, me);
// support both PUT and POST to avoid client mismatch
router.put('/change-password', auth, changePassword);
router.post('/change-password', auth, changePassword);

// Forgot Password endpoints
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

module.exports = router;