import { User } from "./models/users.js";
import { UserFriends } from "./imports.js";
import sequelize from "../connection.js";
import { QueryTypes } from "sequelize";

const getCurrentUser = async (identifier) => {
  const query =
    typeof identifier === "number" ? { id: identifier } : { tag: identifier };

  return await User.findOne({ where: query });
};

const getCurrentUserPendingRequests = async (currentUserId) => {
  const pendingRequests = await sequelize.query(`
    SELECT u.fullName, u.photo FROM user_friends AS uf
    INNER JOIN users AS u ON uf.userId = u.id WHERE uf.friendId = :currentUserId
    AND uf.status = 'pending'`,
    {replacements: {currentUserId}, type: QueryTypes.SELECT})
    
  return pendingRequests;
};

export { getCurrentUser, getCurrentUserPendingRequests };
