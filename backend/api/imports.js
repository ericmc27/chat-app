import { Router } from "express"
import { User } from "./models/users.js"
import { UserFriends } from "./models/userFriends.js"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import fs from "fs"
import multer from "multer"
import jwt from "jsonwebtoken"
import { verifyJwtMiddleware } from "./middlewares.js"
import { getCurrentUser, getCurrentUserPendingRequests } from "./utils.js"
import { io, connectedUsers } from "../server.js"

export {
  Router,
  User,
  UserFriends,
  path,
  uuidv4,
  fs,
  multer,
  jwt,
  verifyJwtMiddleware,
  io,
  getCurrentUser,
  getCurrentUserPendingRequests,
  connectedUsers
};