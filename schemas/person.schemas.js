const Joi = require('joi');

const id = Joi.number().integer();
const firstName = Joi.string().min(2).max(25);
const lastName = Joi.string().min(2).max(25);
const birthDate = Joi.date();
const phoneNumber = Joi.string().min(6).max(35);
const role = Joi.string().min(2).max(25);


const createPersonSchema = Joi.object({
  firstName: firstName.required(),
  lastName: birthDate.required(),
  role: role.required(),
});


const updatePersonSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
  birthDate: birthDate,
  email: email,
  phoneNumber: phoneNumber,
});



const getPersonSchema = Joi.object({
  id: id.required(),
});


module.exports = { createPersonSchema, updatePersonSchema, getPersonSchema };
