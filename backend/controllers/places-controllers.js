const HttpError = require('../models/http-error');

const DUMMY_PLACES = [
    {
        id: "p1",
        title: "Ellora Caves",
        description: "Ellora is one of the largest rock-cut Hindu temple cave complexes in the world",
        location: {
            lat: 20.0258,
            lng: -75.1780
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
            lng: -76.4600
        },
        address: "Hampi, Karnataka",
        creator: "u1"
    }
];

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.filter(p => {  // filter placeId
        return p.id === placeId;
    });

    if(!place.length) {
        throw new HttpError('Could not find place for given id!', 404);
    }
    
    return res.json({place})
}

const getPlacesByUserId = (req, res, next) => {
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

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;