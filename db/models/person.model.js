const { Model, DataTypes, Sequelize } = require('sequelize');

const PERSON_TABLE = 'persons';

const PersonSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  firstName:{
    allowNull: true,
    type: DataTypes.STRING,
  },
  lastName:{
    allowNull: true,
    type: DataTypes.STRING,
  },
  birthday: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
}

class Person extends Model{

  static associate(){
    //associate
  }

  static config(sequelize){
      return {
        sequelize,
        tableName: PERSON_TABLE,
        modelName: 'Person',
        timestamps: false,
      }
  }
}


module.exports = { PERSON_TABLE,  PersonSchema, Person };
