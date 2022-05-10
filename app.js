const express = require('express');
const mars = express();
const genres= require('./routes/genres');

mars.use(express.json());
mars.use('/mars_tv/v1/api/genres',genres);

module.exports =  mars;
//finished project springs backend genres
