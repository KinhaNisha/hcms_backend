const userCtrl = require('../controllers/userController')

// router
const router = require('express').Router()


// user routers

router.post('/addUser', userCtrl.addUser)
router.get('/allUsers', userCtrl.getAllUsers)

router.get('/:id', userCtrl.getOneUser)
router.get('/:id', userCtrl.updateUser)
router.get('/:id', userCtrl.deleteUser)

module.exports = router