const Joi = require('joi');

const id = Joi.number().integer();
const personID = Joi.number().integer();
const userID = Joi.number().integer();
const creditCard = Joi.string().min(16).max(16);


const createCustomerSchema = Joi.object({
  personID: personID.required(),
  userID: userID.required(),
  creditCard: creditCard.required(),
});


const updateCustomerSchema = Joi.object({
  creditCard: creditCard,
});


const getCustomerSchema = Joi.object({
  id: id.required(),
});


module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };
