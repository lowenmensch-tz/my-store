const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email().min(5).max(40);
const nickName = Joi.string().min(2).max(40);
const password = Joi.string().min(8).max(40).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);


const createUserSchema = Joi.object({
  nickName: nickName.required(),
  email: email.required(),
  password: password.required(),
});


const updateUserSchema = Joi.object({
  nickName: nickName,
});


const getUserSchema = Joi.object({
  id: id.required(),
});


module.exports = { createUserSchema, updateUserSchema, getUserSchema };
