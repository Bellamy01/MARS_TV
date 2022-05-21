const mongoose = require('mongoose');
const express = require('express');
const mars = express();
const customers = require('./routes/customers');
const genres= require('./routes/genres');


mongoose.connect('mongodb://127.0.0.1:27017/mars_tv')
    .then(()=>console.log('Connected to MongoDB...'))
    .catch(err=>console.error('Could not connect to MongoDB...'));
    



mars.use(express.json());

//endpoints

mars.use('/mars_tv/v1/api/genres',genres);
mars.use('/mars_tv/v1/api/customers',customers);


module.exports =  mars;
//finished project springs backend genres
