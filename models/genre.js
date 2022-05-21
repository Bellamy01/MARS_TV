const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50   
    }
});

const Genre = new mongoose.model('Genre',genreSchema);

function validateGenre(genre){
const schema = Joi.object({
        name:Joi.string().required().min(3)
    })
    return schema.validate(genre);
}

exports.Genre = Genre;
exports.validateGenre = validateGenre;
