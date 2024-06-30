const express = require('express');
const userCtrl = require('../controllers/userController');
const { validateUser, checkValidation, authenticate, authorize } = require('../middlewares/userMiddleware');
const router = express.Router();

// Register route
router.post('/register', validateUser('register'), checkValidation, userCtrl.registerUser);

// Login route
router.post('/login', validateUser('login'), checkValidation, userCtrl.loginUser);

// Get all users (only accessible by admin)
router.get('/allUsers', authenticate, authorize('admin'), userCtrl.getAllUsers);

// Get specific user by id
router.get('/:id', authenticate, userCtrl.getOneUser);

// Update user by id
router.put('/:id', authenticate, validateUser('register'), checkValidation, userCtrl.updateUser);

// Delete user by id
router.delete('/:id', authenticate, userCtrl.deleteUser);

module.exports = router;
