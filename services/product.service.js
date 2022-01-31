
const faker = require("faker");
const boom = require("@hapi/boom");
const sequelize = require("../libs/sequelize");
class ProductService{


  constructor(){
    this.products = [];
  }


  async create(body){

    const newProduct = {
      id:faker.random.uuid(),
      ...body
    };

    this.products.push(newProduct);

    return newProduct;
  }


  async find(){
    const query = 'SELECT * FROM products';
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne(id){

    const product = this.products.find(item => item.id === id);
    if(!product) {
      throw boom.notFound('Product not found');
    }
    if(this.products){
      throw boom.conflict('Product is block');
    }
    return product;
  }


  async update(id, changes){
    const index = this.products.findIndex( product => product.id === id );

    if(index === -1){
      throw boom.notFound('Product not found');
    }

    const currentProduct = this.products[index];
    this.products[index] = {
      ...currentProduct,
      ...changes
    }

    return this.products[index];
  }


  async delete(id){

    const index = this.products.findIndex(product => product.id === id);

    if(index === -1){
      throw boom.notFound('Product not found');
    }

    const deleted = this.products.splice(index, 1);
    return deleted;
  }

}


module.exports = ProductService;
