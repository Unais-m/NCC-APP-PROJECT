const jwt = require('jsonwebtoken');
const User = require('../models/User');

const withAuth =
  (...allowedRoles) =>
  async (req, res, next) => {
    try {
      const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Auth middleware error', error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  };

module.exports = withAuth;

