import { User } from './models.js'

const getCurrentUser = async (userId)=> {
  return await User.findOne({where: {id: userId}})
}

export { getCurrentUser }