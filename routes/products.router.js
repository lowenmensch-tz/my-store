const express = require('express');
const ProductService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schemas');

const router = express.Router();
const service = new ProductService();


router.get('/', async (req, res) => {

  const product = await service.find();

  res.json(product);

});


router.get('/:id',
validatorHandler(getProductSchema, 'params'),
async (req, res, next) => {

    try{
      let { id } = req.params;
      const product = await service.findOne(id);

      return res.json(product);
    }catch(e){
      //res.status(404).json({ message: e.message });
      next(e);
    }
  });


//POST
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
      const body = req.body;
      const product = await service.create(body);

      res.status(201).json({
        message: 'created',
        data: product
      });
    });


//PATCH update parcial
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),

  async (req, res) => {

    try{
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);

      return res.json( {
        message: 'updated',
        data: product
      } );
    }catch(e){
      next(e);
    }
  });


//DELETE
router.delete('/:id', async (req, res) => {

  try{
    const { id } = req.params;
    const product = await service.delete(id);

    return res.json( {
      message: 'deleted',
      data: product
    });
  }catch(e){
	  next(e);
  }
});

module.exports = router;
