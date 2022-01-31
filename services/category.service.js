const faker = require('faker');
const boom = require("@hapi/boom");
const pool = require('../libs/postgres.pool');

class CategoryService{

  constructor(){
    this.categories = [];
    this.pool = pool;
    this.pool.on('error', (err) => console.error('Unexpected error on idle client', err) );
  }


  async create(body){
    const newCategory = {
      id: faker.random.uuid(),
      ...body,
    }

    this.categories.push(newCategory);
    return newCategory;
  }


  async find(){
    const query = 'SELECT * FROM category';
    const rta = await pool.query(query);
    return rta.rows;
  }


  async findOne(id){

    const category = this.categorories.find(item => item.id === id);
    if(!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }


  async update(id, changes){

    const index = this.categories.findIndex(category => category.id === id);
    if(index === -1){
      throw boom.notFound('Category not found');
    }

    const currentCategory = this.categories[index];
    this.categories[index] = {
      ...currentCategory,
      ...changes,
     };

    return this.categories[index];
  }



  async delete(id){

    const index = this.categories.findIndex(category => category.id === id);

    if(index === -1){
      throw boom.notFound('Category not found');
    }

    const deleted = this.categories.splice(index, 1);
    return deleted;
  }

}


module.exports = CategoryService;
