const HttpError = require('../models/http-error');  // module for error handling
const { v4: uuidv4 } = require('uuid'); // module for unique id generation
const { validationResult } = require('express-validator');

// dummy data
let DUMMY_PLACES = [
    {
        id: "p1",
        title: "Ellora Caves",
        description: "Ellora is one of the largest rock-cut Hindu temple cave complexes in the world",
        location: {
            lat: 20.0258,
            lng: 75.1780
        },
        address: "Ellora Cave Rd, Ellora, Maharashtra 431102",
        creator: "u1"
    },
    {
        id: "p2",
        title: "Hampi",
        description: "Hampi is an ancient village dotted with numerous ruined temple complexes from the Vijayanagara Empire",
        location: {
            lat: 15.3350,
            lng: 76.4600
        },
        address: "Hampi, Karnataka",
        creator: "u1"
    }
];

const getPlaceById = (req, res, next) => {  // get place by id middleware
    const placeId = req.params.pid; // `get` request are available with params, access by `req.params.$` 
    const place = DUMMY_PLACES.filter(p => {  // filter placeId
        return p.id === placeId;
    });

    if(!place.length) {
        throw new HttpError('Could not find place for given id!', 404);
    }
    
    return res.json({place})
}

const getPlacesByUserId = (req, res, next) => { // get places by creator user id middleware
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p => {
       return p.creator === userId;
    });

    if(!places.length) {
        return next(
            new HttpError('Could not find places for given user id!', 404)
        );
    }

    res.json({places});
}

const createPlace = (req, res, next) => {   // create new place middleware for `post` requests
    // `post` request provides data in `req.body`
    const result = validationResult(req);
    if(!result.isEmpty()){
        console.log('Validation Result : ', result);
        throw new Error('Invalid inputs passed!', 422);
    }

    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };

    DUMMY_PLACES.push(createdPlace); // `push` at the end || `unshift` at the start
    console.log('DUMMY_PLACES : ', DUMMY_PLACES);
    res.status(201).json({place: createdPlace});
}

const updatePlace = (req, res, next) => {   // update place middleware function for `patch` request

    const result = validationResult(req);
    if(!result.isEmpty()){
        throw new Error('Invalid inputs passed!', 422);
    }

    const { title, description } = req.body;    // req body contains editable field data
    const placeId = req.params.pid;
    
    const updatedPlace = {...DUMMY_PLACES.find(p => p.id === placeId)}; // destructuring for copy of object without reference (immutable)
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);

    updatedPlace.title = title;
    updatedPlace.description = description;
    
    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place : updatedPlace});
}

const deletePlace = (req, res, next) => {   // delete place middleware function for `delete` request
    const placeId = req.params.pid;

    if(!DUMMY_PLACES.find(p => p.id === placeId)){
        throw new HttpError('Could not find place for given id', 404);
    }

    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(200).json({message: 'Deleted place'});
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;