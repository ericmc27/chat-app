import { DataTypes } from 'sequelize'
import  sequelize from "../../connection.js"

const User = sequelize.define('User',{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true
  }
},
  {
    tableName: 'users',
    timestamps: false
})

User.belongsToMany(User, {
  as: 'friends',
  through: 'user_friends',
  foreignKey: 'userId',
  otherKey: 'friendId'
})

export { User }