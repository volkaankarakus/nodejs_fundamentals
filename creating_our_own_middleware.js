const fs = require('fs');
const express = require('express');
const app = express();

// MIDDLEWARE
app.use(express.json());

const toursJson =  JSON.parse(fs.readFileSync(`${__dirname}/express-crud/data/tours-simple.json`));


// app
//     .route('/api/v1/tours')
//     .get(getAllTours)
//     .post(createTour);


// CREATING OUR MIDDLEWARE
app.use((request,response,next) => {
    console.log('Hello from the middleware');
    next();

});

// CREATE A NEW MIDDLEWARE FOR MANUPULATING REQUEST OBJECT
app.use((request,response,next) => {
    request.requestTime = new Date().toISOString();
    next();
});


// GET ALL TOURS
const getAllTours = (request,response) => {
    response.status(200).json({ 
        status : 'success',
        requestedAt :request.requestTime,
        results : toursJson.length,
        data  : {
            toursJson
        }
    });
}

app.route('/api/v1/tours').get(getAllTours);

// app
//     .route('/api/v1/tours/:id')
//     .get(getTour)
//     .patch(updateTour) 
//     .delete(deleteTour);

// LISTEN APP
const port = 3000;
app.listen(port , () => {
    console.log(`App running on port ${port}`);
});