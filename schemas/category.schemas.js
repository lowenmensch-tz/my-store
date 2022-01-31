const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(2).max(35);
const description = Joi.string().min(10).max(50);


const createCategorySchema = Joi.object({
    name: name.required(),
});


const updateCategorySchema = Joi.object({
    name: name,
    description: description,
});


const getCategorySchema = Joi.object({
    id: id.required(),
});


module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema };
