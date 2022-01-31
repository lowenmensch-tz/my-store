const express = require('express');
const PersonService = require('./../services/person.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createPersonSchema, updatePersonSchema, getPersonSchema } = require('./../schemas/person.schemas');

const router = express.Router();

const service = new PersonService();


router.get('/', async (req, res) => {

  const person = await service.find();
  res.json(person);
});


router.get('/:id',
  validatorHandler(getPersonSchema, 'params'),
  async (req, res) => {

      try{
        const { id } = req.params;
        const person = await service.findOne(id);

        res.json(person);

      }catch(e){
        res.status(404).json({ message: e.message });
      }

    });


//POST
router.post('/',
  validatorHandler(createPersonSchema, 'body'),
  async (req, res) => {
      const body = req.body;
      const person = await service.create(body);

      res.status(201).json({
        message: 'created',
        data: person,
      });
    });


//PATCH update parcial
router.patch('/:id',
  validatorHandler(getPersonSchema, 'params'),
  validatorHandler(updatePersonSchema, 'body'),

  async (req, res) => {

      try{
        let body = req.body;
        let { id } = req.params;
        const person = await service.update(id, body);

        res.json({
          message: 'updated',
          data: person,
        });
      }catch(e){
        res.status(404).json({ message: e.message });
      }

    });

module.exports = router;
