const { Model, DataTypes, Sequelize } = require('sequelize');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  personID: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  userID: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  email:{
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  nickName:{
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password:{
    allowNull: false,
    type: DataTypes.STRING,
  }
}

class Customer extends Model{

  static associate(){
    //associate
  }

  static config(sequelize){
      return {
        sequelize,
        tableName: USER_TABLE,
        modelName: 'Customer',
        timestamps: false,
      }
  }
}


module.exports = { CUSTOMER_TABLE,  CustomerSchema, Customer };
