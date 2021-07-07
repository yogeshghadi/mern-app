// Route registration separated from `app.js`

const express = require('express'); // import `express` module to utilise `express.Router` method
const { check } = require('express-validator') // import `express-validator` for request body data validation for post methods

// Routes middleware functions moved as separate controllers are imported
const placesControllers = require('../controllers/places-controllers');

const router = express.Router(); // use builin `Router` method for router instance

const newPlaceDataValidator = [
    check('title').notEmpty(),
    check('description').isLength({min: 5}),
    check('address').notEmpty()
];

const updatePlaceDataValidator = [
    check('title').notEmpty(),
    check('description').isLength({min: 5})
];

router.get('/:pid', placesControllers.getPlaceById);  // `get` => routes for place by id registered

router.get('/user/:uid', placesControllers.getPlacesByUserId); // `get` => routes for places by creator user id registered

router.post('/', newPlaceDataValidator, placesControllers.createPlace); // `post` => route for creating new place registered

router.patch('/:pid', updatePlaceDataValidator, placesControllers.updatePlace);   // `patch` => route for updating existing place by id

router.delete('/:pid', placesControllers.deletePlace);

module.exports = router;