const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {validateGenre,Genre}= require('../models/genre');
//const { appendFile } = require('fs');
//const { valid } = require('joi');

        //GET
router.get('/',async(req,res)=>{
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id',async(req,res)=>{
    const genre = await Genre.find().sort('name');
    if(!genre) {
        res.status(404).send('The requested genre was not found!!!');
        return;
    }
    res.send(genre);
});
        //POST

router.post('/',async (req,res)=>{

    const {error} = validateGenre(req.body)
    if(error){ return res.status(400).send(error.details[0].message); }
    
    let genre = new Genre({name:req.body.name})
    genre = await genre.save();
    res.send(genre);
});

//PUT

router.put('/:id',async (req,res)=>{

    const { error } = validateGenre(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{
        new:true
    });
    //look up the genre
    if(!genre){
        res.status(404).send('The genre was not found!!!');
        return;
    }
    //validate

    //send the genre
    res.send(genre);
});
//patch


/*Patch basically does the same thing but it allows to modify only the content
 you want to unlike 'put' which requires you to input all the content of the 
 object during modification  */

router.patch('/:id',async (req,res)=>{
    
    const { error } = validateGenre(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }
    
    const genre = await Genre.findbyIdAndUpdate(req.params.id,{name:req.body.name}, {new:true})
    if(!genre){
        return res.status(404).send('The entered genre was not found!!!');
    }

    res.send(genre);
})


router.delete('/:id',async(req,res)=>{
    //look up the course
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre){
        return res.status(404).send('The genre was not found!!!');
    }
    //delete

    //send the course
    res.send(genre);
});

module.exports = router;