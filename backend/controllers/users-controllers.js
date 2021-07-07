const { validationResult } = require('express-validator');
const { v4 : uuidv4 } = require('uuid');

const HttpError = require('../models/http-error');

const DUMMY_USERS = [
    {
        id: "u1",
        name: "Aaroh",
        image: "https://i.picsum.photos/id/237/200/200.jpg?hmac=zHUGikXUDyLCCmvyww1izLK3R3k8oRYBRiTizZEdyfI",
        placeCount: 2,
        email: "Aaroh@test.in",
        password: "abc#123"
    }
]

const getUsers = (req, res, next) => {
    if(!DUMMY_USERS.length) {
        return next(
            new HttpError('No users found!', 404)
        );
    }

    res.status(200).json({users: DUMMY_USERS});
}

const signupUser = (req, res, next) => {

    const result = validationResult(req);

    if(!result.isEmpty()){
        console.log(result);
        throw new HttpError('Inavalid input passed,', 422);
    }

    const { name, image, placeCount, email, password } = req.body;

    const hasUser = DUMMY_USERS.find(u => u.email === email);
    if(hasUser) {
        throw new HttpError('Could not create user, email already exists!', 422);
    }

    const user = {
        id: uuidv4(),
        name,
        image,
        placeCount,
        email,
        password
    }

    DUMMY_USERS.push(user);
    res.status(201).json({user});
}

const loginUser = (req, res, next) => {

    const { email, password } = req.body;

    const user = {...DUMMY_USERS.find(u => u.email === email)};

    if(!user || user.password !== password){
        throw new HttpError('Invalid credentials!', 401);
    }

    res.status(200).json({message: 'Login successful!'});
}

exports.getUsers = getUsers;
exports.signupUser = signupUser;
exports.loginUser = loginUser;