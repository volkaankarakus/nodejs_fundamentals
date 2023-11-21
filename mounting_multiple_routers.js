const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();

// Middleware
app.use(express.json());
// 3rd party middleware
app.use(morgan('dev'));

const toursJson =  JSON.parse(fs.readFileSync(`${__dirname}/express-crud/data/tours-simple.json`));


// MULTIPLE ROUTERS
const tourRouter = express.Router(); 
const userRouter = express.Router();
// tourRouter is a real Middleware.
// we wanna use it for a specific route.
// we created basically a sub application.
tourRouter
    .route('/')
    .get(getAllTours)
    .post(createTour);
tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);
userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser);
userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users', userRouter); // Mounting is  a new router on a route.


// ROUTE HANDLERS
const getAllUsers = (request,response) => {
    response.status(500).json({
        status : 'error',
        message : 'This route is not yet defined!',
    });
};

const getUser = (request,response) => {
    response.status(500).json({
        status : 'error',
        message : 'This route is not yet defined!',
    });
};

const createUser = (request,response) => {
    response.status(500).json({
        status : 'error',
        message : 'This route is not yet defined!',
    });
};

const updateUser = (request,response) => {
    response.status(500).json({
        status : 'error',
        message : 'This route is not yet defined!',
    });
};

const deleteUser = (request,response) => {
    response.status(500).json({
        status : 'error',
        message : 'This route is not yet defined!',
    });
};



// START THE SERVER
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}....`);
});
