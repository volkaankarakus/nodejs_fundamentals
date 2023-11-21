const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./multiple-routers-project/routes/tourRoutes');
const userRouter = require('./multiple-routers-project/routes/userRoutes');

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

// ROUTES
// this two routes are actually midddleware, which is why we can use main.js in order to mount them!
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

