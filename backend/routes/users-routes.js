const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const usersControllers = require('../controllers/users-controllers');

const signupDataValidator = [
    check('name').notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min:6})
]

router.get('/', usersControllers.getUsers);

router.post('/signup', signupDataValidator, usersControllers.signupUser);

router.post('/login', usersControllers.loginUser);

module.exports = router;