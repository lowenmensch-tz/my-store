const express = require('express');
const CustomerService = require('./../services/customer.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('./../schemas/customer.schemas');

const router = express.Router();

const service = new CustomerService();


router.get('/', async (req, res) => {

  const customers = await service.find();
  res.json(customers);
});


router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res) => {

      try{
        const { id } = req.params;
        const customer = await service.findOne(id);

        res.json(customer);

      }catch(e){
        res.status(404).json({ message: e.message });
      }

    });


//POST
router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res) => {
      const body = req.body;
      const customer = await service.create(body);

      res.status(201).json({
        message: 'created',
        data: customer,
      });
    });


//PATCH update parcial
router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),

  async (req, res) => {

      try{
        let body = req.body;
        let { id } = req.params;
        const customer = await service.update(id, body);

        res.json({
          message: 'updated',
          data: customer,
        });
      }catch(e){
        res.status(404).json({ message: e.message });
      }

    });

module.exports = router;
