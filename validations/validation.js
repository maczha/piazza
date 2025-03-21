const Joi = require('joi'); 


const registerValidation = (data) => {
    const schemaValidation = Joi.object({
        name: Joi.string().required().min(3).max(30), 
        email: Joi.string().email().required(), 
        password: Joi.string().required().min(6).max(255) 
    });

    return schemaValidation.validate(data);
};


const postValidation = (data) => {
    const schemaValidation = Joi.object({
        title: Joi.string().required().max(100),
        description: Joi.string().required().max(500), 
        likes: Joi.number().default(0),
        createdBy: Joi.string().required() 
    });

    return schemaValidation.validate(data);
};

const loginValidation = (data) => {
    const schemaValidation = Joi.object({
        email: Joi.string().email().required(), 
        password: Joi.string().required().min(6).max(255) 
    });

    return schemaValidation.validate(data);
};

module.exports = { registerValidation, postValidation, loginValidation };
