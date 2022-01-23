const faker = require('faker');

class UserService{

  constructor(){
    this.users = [];
    this.generate();
  }


  generate(){
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.random.uuid(),
        firstName: faker.name.firstName(),
        lastMName: faker.name.lastName(),
        age: faker.random.number(),
        email: faker.internet.email(),
        nickname: faker.internet.userName(),
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


  async create(user){

    const newUser = {
      id: faker.random.uuid(),
      ...user,
    };
    this.users.push(newUser);

    return newUser;
  }


  async find(){
    return this.users;
  }


  async findOne(id){
    const index = this.users.findIndex(user => user.id === id);
    if(index === -1){
      throw new Error('User not found');
    }
    return this.users[index];
  }


  async update(id, changes){
    let index = this.users.findIndex(user => user.id === id);
    const currentUser = this.users[index];

    if(!currentUser){
      throw new Error('User not found');
    }

    this.users[index] = {
      ...currentUser,
      ...changes,
    };

    return this.users[index];
  }


  async delete(id){

    const index = this.users.findIndex(user => user.id === id);

    if(index === -1){
      throw new Error('User not found');
    }

    const deletedUser = this.users.splice(index, 1);

    return deletedUser;

  }

}

module.exports = UserService;
