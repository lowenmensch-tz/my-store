const express = require('express');
const ProductService = require('./../services/product.service');

const router = express.Router();
const service = new ProductService();


router.get('/', (req, res) => {

  const product = service.find();

  res.json(product);

});


router.get('/:id', (req, res) => {

  let { id } = req.params;
  const product = service.findOne(id);

  if(!product) return res.status(404).json({ message: 'Not found' });
  if(product)  return res.json(product);
});


//POST
router.post('/', (req, res) => {
  const body = req.body;

  res.status(201).json(service.create(body));
});


//PATCH update parcial
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.findOne(id);

  if(!product) return res.status(404).json({ message: 'Not found' });
  if(product)  return res.json( service.update(id, body) );
});


//DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);

  if(!product) return res.status(404).json({ message: 'Not found' });
  if(product)  return res.json( service.delete(product) );
});

module.exports = router;
