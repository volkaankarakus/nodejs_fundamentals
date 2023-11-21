const fs = require("fs");
const express = require('express');
const { error } = require("console");
const { request } = require("http");
const { create } = require("domain");
const app = express();

app.use(express.json());

const toursJson =  JSON.parse(fs.readFileSync(`${__dirname}/express-crud/data/tours-simple.json`));


// GET ALL TOURS
///////////////////////////////////////////////
const getAllTours = (request,response) => {
    response.status(200).json({
        status : 'success',
        results : toursJson.length,
        data  : {
            toursJson
        }
    });
}



// GET TOUR
///////////////////////////////////////////////
const getTour = (request, response) => {
    const stringID = request.params.id;
    const tour = toursJson.find(element  => element.id === stringID);
    if(!tour){
        return response.status(404).json({
            status : 'fail',
            message : 'Invalid ID',
        });
    }
    response.status(200).json({
        status :'success',
        data : { tour }
    })
};

// CREATE TOUR
///////////////////////////////////////////////
const createTour = (request,response) => {
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
};


// UPDATE TOUR
///////////////////////////////////////////////
const updateTour = (request, response ) => {
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
    });
};



// DELETE TOUR
///////////////////////////////////////////////
const deleteTour = (request, response) => {
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
};


// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tour/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour) 
    .delete(deleteTour);

// LISTEN
///////////////////////////////////////////////
const port  = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});