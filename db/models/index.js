const { Person, PersonSchema } = require('./person.model');
const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');

function setupModels(sequelize){
  Person.init(PersonSchema, Person.config(sequelize) );
  User.init(UserSchema, User.config(sequelize) );
  Customer.init(CustomerSchema, Customer.config(sequelize) );

  associateModels();
}

function associateModels(){
  Person.Customer = Person.hasOne(Customer);
  User.Customer = User.hasOne(Customer);
}


module.exports =  setupModels;
