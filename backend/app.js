const express = require('express'); // core framework for `nodejs`
const bodyParser = require('body-parser');  // `body-parser` used for parsing request body (provides methods)

const placesRoutes = require('./routes/places-routes'); // importing registered places routes
const usersRoutes = require('./routes/users-routes');   // importing registred users routes

const HttpError = require('./models/http-error'); // custom error handling module with `HttpError` class

const app = express();  // spin up `express` server

app.use(bodyParser.json()); // middleware to parse POST req body and return json

app.use('/api/places', placesRoutes);  // all placesRoutes has initial segment as `/api/places`

app.use('/api/users', usersRoutes); // all usersRoutes has initial segment as `/api/users`

// error handling for unsupported `post` api method routes
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

// Common error handling for `get` api method routes
app.use((error, req, res, next) => {
    if(res.headerSent){ // if response is sent
        return next(error); // throw error and exit 
    }
    // else
    res.status(error.code || 500);  // set response status with error code
    res.json({message: error.message || 'An unknown error occured'}); // set response message as json object
    
    // `res.json` exits process and stops any `next` delegation
});

app.listen(5000);