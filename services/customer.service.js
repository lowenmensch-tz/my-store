const boom = require("@hapi/boom");
const { models } = require('./../libs/sequelize');


class CustomerService{
  constructor(){}


  async create(customer){

    const newCustomer = await models.Customer.create(customer);
    return newCustomer;
  }


  async find(){
    const rta = await models.Customer.findAll();
    return rta;
  }


  async findOne(id){

    const customer = await models.customer.findByPk(id);
    if(!customer){
      throw boom.notFound('customer not found');
    }
    return customer;
  }


  async update(id, changes){

    const customer = await this.findOne(id);
    const rta = customer.update(changes);
    return rta;
  }
}


module.exports =  CustomerService;
