import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const isClient = (req, res, next) => {
    if (req.user && req.user.role === 'client') {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as a client');
    }
};

const isCreative = (req, res, next) => {
    if (req.user && req.user.role === 'creative') {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as a creative');
    } 
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as an admin');
    }
};

const isAdminOrClient = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'client')) {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as an admin or client');
    }
};

export { protect, isClient, isCreative, isAdmin, isAdminOrClient };
