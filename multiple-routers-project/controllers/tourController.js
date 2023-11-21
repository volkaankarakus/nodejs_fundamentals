const fs = require('fs'); 

// now our __dirname is routes . we should get back there with ../
const toursJson =  JSON.parse(fs.readFileSync(`${__dirname}/../express-crud/data/tours-simple.json`));

// It is not a clean code to check the 
// ID parameter in each function 
// individually to see if it is appropriate.
// Like :
    // const stringID = request.params.id;
    // const tour = toursJson.find(element  => element.id === stringID);
    // if(!tour){
    //     return response.status(404).json({
    //         status : 'fail',
    //         message : 'Invalid ID',
    //     });
    // }


// ********************************  EXTRA MIDDLEWARES ********************************
exports.checkID = (request,respose,next, paramValue) => {
    console.log(`Tour ID : ${paramValue}`);
    const stringID = request.params.id;
    const tour = toursJson.find(element  => element.id === stringID);
    if(!tour){
        return response.status(404).json({
            status : 'fail',
            message : 'Invalid ID',
        });
    }
    next();
};

exports.checkBody = (request,resppnse,next) => {
    if(!request.body.name || !request.body.price){
        return response.status(400).json({
            status : 'fail',
            message : 'Missing name or price',
        })
    }
    next();
}


// ******************************** HANDLER FUNCTIONS ********************************
// GET ALL TOURS
exports.getAllTours = (request,response) => {
    response.status(200).json({
        status : 'success',
        results : toursJson.length,
        data  : {
            toursJson
        }
    });
}
// GET TOUR
exports.getTour = (request, response) => {
    response.status(200).json({
        status :'success',
        data : { tour }
    })
};
// CREATE TOUR
exports.createTour = (request,response) => {
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
exports.updateTour = (request, response ) => {
    response.status(200).json({
        status : 'success',
        data : {
            tour : '<Updated Tour Here ...>',
        },
    });
};
// DELETE TOUR
exports.deleteTour = (request, response) => {
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

// We want to actually export all of these functions from this module
// In this case, we do not have only one export, so we are not gonna use module.export
//   but instead we will put all of these functions on the export object. 
//   (Delete the "const" at the beginning of the function and "exports." adding)
