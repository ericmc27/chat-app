import { DataTypes } from 'sequelize'
import { User } from './users.js';
import  sequelize from "../../connection.js"

const UserFriends = sequelize.define('UserFriends', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },

  friendId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'
  }
},{
  tableName: 'user_friends',
  timestamps: false,
  indexes: [{
    unique: true,
    fields: ['userId', 'friendId']
  }]
})

UserFriends.belongsTo(User, { foreignKey: 'userId', as: 'Friend' });


export { UserFriends }