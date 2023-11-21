const express = require('express'); 
const tourController =  require('./../controllers/tourController');
 
const tourRouter = express.Router(); 

// Param middleware is middleware that only runs for certain parameters.
// when we have a certain parameter in our URL,  
// In our example, the only parameter that we might have in our route URL is the "ID".
// So we can write middleware that only runs when this "id" is present in the URL.
 
tourRouter.param('id',tourController.checkID);


tourRouter
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);
tourRouter
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = tourRouter; 