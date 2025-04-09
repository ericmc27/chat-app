import { User } from "./models/users.js";
import { UserFriends } from "./imports.js";
import sequelize from "../connection.js";
import { QueryTypes } from "sequelize";

const getCurrentUser = async (identifier) => {
  const query =
    typeof identifier === "number" ? { id: identifier } : { tag: identifier };

  return await User.findOne({ where: query });
};

const getCurrentUserData = async (currentUser)=>{
  const {tag, fullName, photo} = currentUser
  return {tag, fullName, photo}
}

const getCurrentUserPendingRequests = async (currentUserId) => {
  const pendingRequests = await sequelize.query(`
    SELECT u.tag, u.fullName, u.photo FROM user_friends AS uf
    INNER JOIN users AS u ON uf.userId = u.id WHERE uf.friendId = :currentUserId
    AND uf.status = 'pending'`,
    {replacements: {currentUserId}, type: QueryTypes.SELECT})
    
  return pendingRequests;
};

const getCurrentUserFriends = async (currentUserId)=>{
  const friends = await sequelize.query(`
    SELECT u.tag, u.fullName, u.photo FROM user_friends AS uf
    INNER JOIN users AS u ON uf.friendId = u.id WHERE uf.userId = :currentUserId
    AND uf.status = 'accepted'
    `, {replacements: {currentUserId}, type: QueryTypes.SELECT})
  
  return friends
}

export { getCurrentUser, getCurrentUserData, getCurrentUserPendingRequests, getCurrentUserFriends };
