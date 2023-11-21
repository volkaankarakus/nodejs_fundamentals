const fs = require("fs");
const express = require('express');
const { error } = require("console");
const { request } = require("http");
const app = express();

// Middleware is basically a function that can modify
//   the incoming request data.
// It called middleware 
//   because it stands between in the middle of the request and response.
app.use(express.json()); // here is middleware
// data from the body is added to it.

const toursJson =  JSON.parse(fs.readFileSync(`${__dirname}/express-crud/data/tours-simple.json`));


// Get All Tours
app.get('/api/v1/tours', (request, response) => {
    response.status(200).json({
        status : 'success',
        results : toursJson.length,
        data : {
           toursJson,
        },
    });
});

// Get a Specific Tour
app.get('/api/v1/tours/:id', (request, response) => {
    console.log(request.params); // -> for '/api/v1/tours/5' -> it returns { id: '5' }
    // for '/api/v1/tours/:id/:x/:y' -> for '/api/v1/tours/5/21/25' -> it returns { id: '5', x: '21', y: '25' }

    // If we wanna make this parameter optional,  we just add "?"" to it. So no longer we have to specify.
    // for '/api/v1/tours/:id/:x/:y?' -> y is optional. 

    // We keep going with only :id
    // First we convert the id from string to a number.
    const stringID = request.params.id * 1 ; 
    const tour = toursJson.find(element => element.id === stringID);
    if(!tour) {
        return response.status(404).json({
            status : 'fail',
            message : 'Invalid ID',
        })
    }
    response.status(200).json({
        status : 'success',
        data : {
            tour,
        },
        // results : toursJson.length,
        // data : {
        //    toursJson,
        // },
    });
});

// Create New Tour
app.post('/api/v1/tours', (request,response) => {
    console.log(request.body); // body is available on the request because we used that middleware
    const newID = toursJson[toursJson.length -1].id + 1;
    const newTour = Object.assign({id : newID},request.body);
    toursJson.push(newTour);
    fs.writeFileSync(
        `${__dirname}/express-crud/data/tours-simple.json`),
        JSON.stringify(toursJson),
        error => {
        response.status(201).json({
            status : 'success',
            data : {
                toursJson : newTour,
            }
        });
    };
});


// PUT
//  with PUT, we expect that our application receives the entire new updated object
// PATCH
//  with PATCH, we only expect the properties that should actually  on the object. 

app.patch('/api/v1/tours/:id', (request,response) => {
    const stringID = request.params.id * 1 ; 
    const tour = toursJson.find(element => element.id === stringID);
    if(!tour) {
        return response.status(404).json({
            status : 'fail',
            message : 'Invalid ID',
        });  
    }

    response.status(200).json({
        status : 'success',
        data : {
            tour : '<Updated Tour Here ...>',
        },
    })
});

// DELETE
app.delete('/api/v1/tours/:id', (request, response) => {
    const stringID = request.params.id;
    const tour = toursJson.find(element => element.id === stringID);
    if(!tour){
        return response.status(404).json({
            status : 'fail',
            message : 'Invalid ID',
        });
    }

    const index = tours.indexOf(tour);
    tours.splice(index, 1);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
            res.status(204).json({ status: 'success', data: null });
    }
  );
});

const port  = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});