import dotenv from 'dotenv';
dotenv.config();

import { expressjwt } from 'express-jwt';
import User from '../models/userModels.js';

export const isAuthenticated = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

export const isAuthorized = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.auth.id);
      if (user && roles.includes(user.userType)) {
        next();
      } else {
        res.status(403).json({ message: 'You are not authorized to access this resource' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error: ' + error.message });
    }
  };
};
