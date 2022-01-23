const faker = require('faker');

class CategoryService{

  constructor(){
    this.categories = [];
    this.generate();
  }


  generate(){
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
      });
    }
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
    return this.categories;
  }


  async findOne(id){

    const index = this.categories.findIndex(category => category.id === id);
    if(index === -1){
      throw new Error('Product not found');
    }
    return this.categories[index];
  }


  async update(id, changes){
    const index = this.categories.findIndex(category => category.id === id);

    if(index === -1){
      throw new Error('Product not found');
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
      throw new Error('Product not found');
    }

    const deleted = this.categories.splice(index, 1);
    return deleted;
  }

}


module.exports = CategoryService;
