const express = require('express');
const UserService = require('./../services/user.service');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res) => {

  const users = await service.find();
  res.json(users);
});


router.get('/:id', async (req, res) => {

  try{
    const { id } = req.params;
    const user = await service.findOne(id);

    res.json({
      message: 'success',
      data: user
    });
  }catch(e){
    res.status(404).json({ message: e.message });
  }
});


//POST
router.post('/', async (req, res) => {

  const body = req.body;
  const user = await service.create(body);

  res.status(201).json({
    message: 'created',
    data: user,
  });
});


//PATCH update parcial
router.patch('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const body = req.body;
    const user = await service.update(id, body);

    res.json({
      message: 'updated',
      data: user,
    });
  }catch(e){
    res.status(404).json({ message: e.message });
  }
})



//DELETE
router.delete('/:id', async (req, res) => {

  try{
    const { id } = req.params;
    const user = await service.delete(id);

    res.json({
      message: 'deleted',
      data: user,
    });
  }catch(e){
    res.status(404).json({ message: e.message });
  }
});

module.exports = router;
