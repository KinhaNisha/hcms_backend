const db = require('../models/index');
const User = db.users;
const jwt = require('jsonwebtoken');
require('dotenv').config;

// Create user (registration)
const registerUser = async (req, res) => {
    const { name, email, password, role, mobileNo, DOB, address } = req.body;

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
        const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.status(201).send({ success: true, user , token });
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
        const [updated] = await User.update(req.body, { where: { id: req.params.id } });
        
        if (updated === 0) {
            return res.status(404).send({ error: 'User not found' });
        }
        
        const updatedUser = await User.findOne({ where: { id: req.params.id } });
        res.status(200).send({ message: 'User updated successfully', user: updatedUser });
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
    const { role, email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user || user.role !== role) {
            return res.status(400).send({ error: 'Invalid email or role' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ success: true, user , token });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }  // Exclude password from response
        });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const [updated] = await User.update(req.body, { where: { id: req.user.id } });

        if (updated === 0) {
            return res.status(404).send({ error: 'User not found' });
        }

        const updatedUser = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
        res.status(200).send({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getUserHistory = async (req, res) => {
    // Implement logic to fetch user history
};

const getUserReports = async (req, res) => {
    // Implement logic to fetch user reports
};

const getUserAppointments = async (req, res) => {
    // Implement logic to fetch user appointments
};

const getUserBills = async (req, res) => {
    // Implement logic to fetch user bills
};

const getUserPrescriptions = async (req, res) => {
    // Implement logic to fetch user prescriptions
};

module.exports = {
    registerUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    loginUser,
    getProfile,
    updateUserProfile,
    getUserHistory,
    getUserReports,
    getUserAppointments,
    getUserBills,
    getUserPrescriptions
};

