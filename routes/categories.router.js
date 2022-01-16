const express = require('express');
const faker = require('faker');

const router = express.Router();


function generateCategories(categories, limit){
  for (let i = 0; i < limit; i++) {
    categories.push({
      id: faker.random.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
    });
  }
}


router.get('/', (req, res) => {

  let categories = [];
  let { size } = req.query;
  let limit = size || 100;

  generateCategories(categories, limit);

  res.json(categories);
});


router.get('/:id', (req, res) => {

  let { id } = req.params;

  res.json({
    id,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
  });
});


//POST
router.post('/', (req, res) => {
  let body = req.body;

  res.status(201).json({
    message: 'created',
    data: body,
  });
});


//PATCH update parcial
router.patch('/:id', (req, res) => {

  let body = req.body;
  let { id } = req.params;

  res.json({
    message: 'updated',
    data: body,
    id,
  });

});


//DELETE
router.delete('/:id', (req, res) => {
  let { id } = req.params;

  res.json({
    message: 'deleted',
    id,
  });
});

module.exports = router;
