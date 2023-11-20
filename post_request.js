const fs = require("fs");
const express = require('express');
const { error } = require("console");
const app = express();

// Middleware is basically a function that can modify
//   the incoming request data.
// It called middleware 
//   because it stands between in the middle of the request and response.
app.use(express.json()); // here is middleware
// data from the body is added to it.

const toursJson =  JSON.parse(fs.readFileSync(`${__dirname}/express-crud/data/tours-simple.json`));


app.get('/api/v1/tours', (request, response) => {
    response.status(200).json({
        status : 'success',
        results : toursJson.length,
        data : {
           toursJson,
        },
    });
});

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

const port  = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});