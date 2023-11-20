const fs = require('fs');
const express = require('express');

const app = express();

// app.get('/', (request, response) => {
//     // response.status(200).send('Hello, world'); or
//     response.status(200).json({message: 'Hello, world',app:'First app'});
// });

// app.post('/', (request, response) => {
//     response.send('You can post to this endpoint at any time');
// });
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

const port  = 3000;
// for starting up the server we use app.listen()
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

