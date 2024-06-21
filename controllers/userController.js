const db = require('../models');
const User = db.users;

// Create user (registration)
const createUser = async (req, res) => {
    const { name, email, password, role, mobileNo, DOB, address } = req.body;

    // if (!password || password.length < 8 || password.length > 50) {
    //     return res.status(400).send({ error: 'Password must be between 8 and 50 characters' });
    // }
    
    // Check if the role is admin, if so, reject the registration
    if (role === 'admin') {
        return res.status(403).send({ error: 'Registration not allowed for admin users' });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send({ error: 'Email already registered' });
        }
        const user = await User.create({ name, email, password, role, mobileNo, DOB, address });
        res.status(201).send({ success: true, user });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Get specific user by id
const getOneUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Update user by id
const updateUser = async (req, res) => {
    try {
        const user = await User.update(req.body, { where: { id: req.params.id } });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Delete user by id
const deleteUser = async (req, res) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.status(200).send({ success: true, message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// User login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }

        res.status(200).send({ success: true, user });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    loginUser
};
