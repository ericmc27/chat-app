import { DataTypes } from 'sequelize'
import  sequelize from "../connection.js"

const User = sequelize.define('User',{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
  {
    tableName: 'user',
    timestamps: false
})

export { User }