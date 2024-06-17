const express = require('express');
const userCtrl = require('../controllers/userController');
const router = express.Router();

// User routes
router.post('/register', userCtrl.createUser);
router.post('/login', userCtrl.loginUser);
router.get('/allUsers', userCtrl.getAllUsers);

router.get('/:id', userCtrl.getOneUser);
router.patch('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;
