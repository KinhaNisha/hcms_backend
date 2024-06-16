const db = require('../models')

const User = db.users

// 1. create user
const addUser = async (req, res) => {
    let data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }

    const user = await User.create(data)
    res.status(200).send(user)
    console.log(user)
}

// 2. get all users
const getAllUsers = async (req, res) => {
    let users = await User.findAll({})
    res.status(200).send(users)
}

// 3. get specific user by id
const getOneUser = async (req, res) => {
    let id = req.params.id
    const user = await User.findOne({ where: {id: id}})
    res.status(200).send(user)
}

// 4. update user by id
const updateUser = async (req,res) => {
    let id = req.params.id
    const user = await User.update(req.body, { where: { id: id}})
    res.status(200).send(user)
}

// 5. delete user by id
const deleteUser = async (req, res) => {
    let id = req.params.id
    await User.destroy({where: {id: id}})
    res.status(200).send('User deleted successfully.')
}

module.exports = {
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
}