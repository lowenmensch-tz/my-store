const express = require('express');
const UserService = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/user.schemas');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res) => {

  const users = await service.find();
  res.json(users);
});


router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {

      try{
        const { id } = req.params;
        const user = await service.findOne(id);

        res.json({
          message: 'success',
          data: user
        });
      }catch(e){
        next(e);
      }
    });


//POST
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try{
      const body = req.body;
      const user = await service.create(body);

      res.status(201).json({
        message: 'created',
        data: user,
      });
    } catch(e){
      next(e);
    }

    });


//PATCH update parcial
router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
    async (req, res, next) => {
      try{
        const { id } = req.params;
        const body = req.body;
        const user = await service.update(id, body);

        res.json({
          message: 'updated',
          data: user,
        });
      }catch(e){
        next(e);
      }
    })



//DELETE
router.delete('/:id', async (req, res, next) => {

  try{
    const { id } = req.params;
    const user = await service.delete(id);

    res.json({
      message: 'deleted',
      data: user,
    });
  }catch(e){
    next(e);
  }
});

module.exports = router;
