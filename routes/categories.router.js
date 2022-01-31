const express = require('express');
const CategoryService = require('./../services/category.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/category.schemas');

const router = express.Router();

const service = new CategoryService();


router.get('/', async (req, res) => {

  const categories = await service.find();
  res.json(categories);
});


router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res) => {

      try{
        const { id } = req.params;
        const category = await service.findOne(id);

        res.json(category);

      }catch(e){
        res.status(404).json({ message: e.message });
      }

    });


//POST
router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res) => {
      const body = req.body;
      const category = await service.create(body);

      res.status(201).json({
        message: 'created',
        data: category,
      });
    });


//PATCH update parcial
router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),

  async (req, res) => {

      try{
        let body = req.body;
        let { id } = req.params;
        const category = await service.update(id, body);

        res.json({
          message: 'updated',
          data: category,
        });
      }catch(e){
        res.status(404).json({ message: e.message });
      }

    });


//DELETE
router.delete('/:id', async (req, res) => {

  try{
    let { id } = req.params;
    const category = await service.delete(id);
    res.json({
      message: 'deleted',
      data: category,
    });
  }catch(e){
    res.status(404).json({ message: e.message });
  }
});

module.exports = router;
