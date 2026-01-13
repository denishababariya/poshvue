const jwt = require('jsonwebtoken');
const { User } = require("../model");
const JWT_SECRET = process.env.JWT_SECRET;

// exports.auth = (req, res, next) => {
//   try {
//     const header = req.headers.authorization || '';
//     let token = null;

//     if (header.startsWith('Bearer ')) token = header.substring(7);
//     if (!token && req.cookies && req.cookies.token) token = req.cookies.token;

//     if (!token) return res.status(401).json({ message: 'Unauthorized' });

//     const payload = jwt.verify(token, JWT_SECRET);
//     req.user = { id: payload.id, role: payload.role };
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
// };

exports.auth = async (req, res, next) => {
  try {
    // Try to get token from Authorization header or cookies
    let token = null;
    const header = req.headers.authorization || '';
    if (header.startsWith('Bearer ')) {
      token = header.substring(7);
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ message: "User not found" });

    // Attach user id and role to request
    req.user = { id: user._id, role: user.role };
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};


exports.requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};