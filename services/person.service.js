const boom = require("@hapi/boom");
const { models } = require('./../libs/sequelize');


class PersonService{
  constructor(){}


  async create(person){

    const newPerson = await models.Person.create(person);
    return newPerson;
  }


  async find(){
    const rta = await models.Person.findAll();
    return rta;
  }


  async findOne(id){

    const person = await models.Person.findByPk(id);
    if(!person){
      throw boom.notFound('Person not found');
    }
    return person;
  }


  async update(id, changes){

    const person = await this.findOne(id);
    const rta = person.update(changes);
    return rta;
  }
}


module.exports =  PersonService;
