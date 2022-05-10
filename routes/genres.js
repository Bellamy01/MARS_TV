const express = require('express');
const router = express.Router();
//const { appendFile } = require('fs');
//const { valid } = require('joi');
const Joi = require('joi');

const genres = [
    {id:1, name:'Romance'},
    {id:2,name:'Horror'}
];
        //GET
router.get('/',(req,res)=>{
    res.send(genres);
});

router.get('/:id',(req,res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) {
        res.status(404).send('The requested genre was not found!!!');
        return;
    }
    res.send(genre);
});
        //POST

router.post('/',(req,res)=>{
    const newgenre = {
        id:genres.length+1,
        name:req.body.name
    }

    const valid_genre = validateGenre(req.body);
    const {error} = validateGenre(req.body)
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    genres.push(newgenre);
    res.send(newgenre);
})

//PUT

router.put('/:id',(req,res)=>{
    //look up the genre
    const genre = genres.find(c=> c.id === parseInt(req.params.id));
    if(!genre){
        res.status(404).send('The genre was not found!!!');
        return;
    }
    //validate
    const validate_genre = validateGenre(req.body);
    const { error }= validateGenre(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    //update
    genre.name = req.body.name;

    //send the genre
    res.send(genre);
});
//patch


/*Patch basically does the same thing but it allows to modify only the content
 you want to unlike 'put' which requires you to input all the content of the 
 object during modification  */

router.patch('/:id',(req,res)=>{
    const genre = genres.find(c=>c.id=== parseInt(req.params.id));
    if(!genre){
        return res.status(404).send('The entered genre was not found!!!');
    }
    const validate_genre = validateGenre(req.body);
    const { error } = validateGenre(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    genre.name = req.body.name;

    res.send(genre);
})


router.delete('/:id',(req,res)=>{
    //look up the course
    const genre = genres.find(c=>c.id === parseInt(req.params.id));
    if(!genre){
        res.status(404).send('The genre was not found!!!');
        return;
    }
    //delete
    const index = genres.indexOf(genre);
    genres.splice(index,1);
    //send the course
    res.send(genre);
});

function validateGenre(genre){
const schema = Joi.object({
        name:Joi.string().required().min(3)
    })
    return schema.validate(genre);
}

module.exports = router;