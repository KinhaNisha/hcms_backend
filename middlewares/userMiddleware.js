const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../models/index');
const User = db.users;

// Middleware for validating registration and login data
const validateUser = (method) => {
    switch (method) {
        case 'register': {
            return [
                body('name').notEmpty().withMessage('Name is required'),
                body('email').isEmail().withMessage('Valid email is required'),
                body('password').isLength({ min: 8, max: 50 }).withMessage('Password must be between 8 and 50 characters'),
                body('mobileNo').isLength({ min: 10, max: 10 }).withMessage('Mobile number must be 10 digits'),
                body('role').isIn(['patient', 'doctor']).withMessage('Role must be either patient or doctor'),
                body('DOB').optional().isDate().withMessage('Date of birth must be a valid date'),
                body('address').notEmpty().withMessage('Address is required')
            ];
        }
        case 'login': {
            return [
                body('email').isEmail().withMessage('Valid email is required'),
                body('password').notEmpty().withMessage('Password is required'),
                body('role').isIn(['patient', 'doctor']).withMessage('Role must be either patient or doctor')
            ];
        }
    }
};

// Middleware for checking validation errors
const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Middleware for authenticating users
const authenticate = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByPk(decoded.id);
        if (!req.user) {
            return res.status(401).send({ error: 'User not found' });
        }
        next();
    } catch (error) {
        res.status(400).send({ error: 'Invalid token' });
    }
};

// Middleware for authorizing admin users
const authorize = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).send({ error: 'Access denied' });
        }
        next();
    };
};

module.exports = {
    validateUser,
    checkValidation,
    authenticate,
    authorize
};
