const boom = require("@hapi/boom");
const { models } = require('./../libs/sequelize');


class UserService{

  constructor(){}


  async create(user){

    const newUser = await models.User.create(user);
    return newUser;
  }


  async find(){
    const rta = await models.User.findAll();
    return rta;
  }


  async findOne(id){

    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('User not found');
    }
    return user;
  }


  async update(id, changes){

    const user = await this.findOne(id);
    const rta = user.update(changes);
    return rta;
  }


  async delete(id){

    const user = await models.User.update(
      {
        isActive: false
      },
      {
        where: {
          id: id,
          isActive: true
        }
      });

    if(!user){
      throw boom.notFound('User not found');
    }

    return user;
  }

}

module.exports = UserService;
