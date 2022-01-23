
const faker = require("faker");
const boom = require("@hapi/boom");

class ProductService{


  constructor(){
    this.products = [];
    this.generate();
  }


  generate(){

    let limit = 100;

    for(let i = 0; i < limit; i++){
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt( faker.commerce.price(), 10 ),
        image: faker.image.image(),
        isBlock: faker.random.boolean(),
      });
    }
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
    return this.products;
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
