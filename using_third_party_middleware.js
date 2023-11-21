// npm install morgan
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();

// MIDDLEWARE
app.use(express.json());



// 3rd PARTY MIDDLEWARE
app.use(morgan('dev'));  // it returns GET /api/v1/tours 200 6.524 ms - 8559
// 6.524ms -> time it took to send back the response
// 8550 -> size of the response in bytes.

 

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



const toursJson =  JSON.parse(fs.readFileSync(`${__dirname}/express-crud/data/tours-simple.json`));


//  ********* ROUTE HANDLERS *********
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


// ROUTES
app.route('/api/v1/tours').get(getAllTours);


// START THE SERVER
const port  = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
