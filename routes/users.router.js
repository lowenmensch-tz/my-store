const express = require('express');
const faker = require('faker');

const router = express.Router();

function generateUsers(users, limit){
  for (let i = 0; i < limit; i++) {
    users.push({
      id: faker.random.uuid(),
      firstName: faker.name.firstName(),
      LastName: faker.name.lastName(),
      gender: faker.name.gender(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip: faker.address.zipCode(),
      country: faker.address.country(),
      avatar: faker.image.avatar(),
    });
  }
}


router.get('/', (req, res) => {

  let users = [];
  let { size } = req.query;
  let limit = size || 100;

  generateUsers(users, limit);

  res.json(users);

});


router.get('/renata', (req, res) => {
  res.json({
    firstName: 'Renata Mavelyn',
    lastMName: 'Dubon Madrid',
    age: '23',
    email: 'mavelyn.mi.amor@reinagatita.com',
    nickname: 'Reina gatita pastelito',
  });
});


router.get('/:id', (req, res) => {

  let { id } = req.params;

  res.json({
    id,
    firstName: faker.name.firstName(),
    LastName: faker.name.lastName(),
    gender: faker.name.gender(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.phoneNumber(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    country: faker.address.country(),
    avatar: faker.image.avatar(),
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
  let { id } = req.params;
  let body = req.body;

  res.json({
    message: 'updated',
    data: req.body,
    id,
  });

})



//DELETE
router.delete('/:id', (req, res) => {

  let { id } = req.params;

  res.json({
    message: 'deleted',
    id,
  });
});

module.exports = router;
