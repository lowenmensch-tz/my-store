
const faker = require("faker");

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
      });
    }
  }


  create(body){
    this.products.push(body);

    return {
      message: 'created',
      data: body
    };
  }


  find(){
    return this.products;
  }

  findOne(id){
    return this.products.find( product => product.id === id );
  }


  update(id, body){

    this.products = this.products.map(
        product => product.id !== id ? product: {id, ...body}
      );

    return {
      message: 'updated',
      data: this.products,
      id,
    }
  }


  delete(product){

    this.products = this.products.filter( function(item){
      return item !== product;
    } );

    return {
      message: 'deleted',
      id: product.id,
    }
  }

}


module.exports = ProductService;
