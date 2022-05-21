const mongoose = require('mongoose');
const Joi = require('joi');

/* const customersSchema = new mongoose.Schema({
    isGold:{
        type:Boolean,
        default:false
    },
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50 
    },
    phone:{
        type:String,
        required:true,
        min:10,
        max:15
    }
}); */


const Customer = mongoose.model('Customer',new mongoose.Schema({
    isGold:{
        type:Boolean,
        default:false
    },
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50 
    },
    phone:{
        type:String,
        required:true,
        min:10,
        max:15
    }
})
);


function validateCustomer(customer){
    const schema = Joi.object({
        name:Joi.string().min(3).required().max(50),
        isGold:Joi.boolean(),
        phone:Joi.string().required().min(10).max(15)
    });
    
    return schema.validate(customer);
};

module.exports.Customer  = Customer;
module.exports.validateCustomer = validateCustomer;