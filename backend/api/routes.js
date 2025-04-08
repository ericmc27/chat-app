import { Router, User, UserFriends, path, uuidv4, fs, multer, jwt, verifyJwtMiddleware, io, getCurrentUser, getCurrentUserPendingRequests, connectedUsers } from './imports.js';

const apiRouter = Router()

apiRouter.post('/login', async (req, res)=>{
  const {email, password} = req.body
  const user = await User.findOne({where:{email, password}})

  if(user){
    const jwtToken = jwt.sign({id: user.id, tag: user.tag}, process.env.SECRET_KEY, {expiresIn: '15m'})
    res.cookie('jwtToken', jwtToken, {httpOnly: true})
    return res.status(200).json({message:'login successful'})
  }

  return res.status(401).json({message:"login unsuccessful"})
})

//All routes below are protected routes
apiRouter.use(verifyJwtMiddleware)


const storage = multer.memoryStorage()
const upload = multer({storage})

apiRouter.get('/get-current-user-data', async (req, res)=>{
  const currentUser = await getCurrentUser(req.currentUserId)
  const {tag, photo} = currentUser
  const pendingRequests = await getCurrentUserPendingRequests(req.currentUserId)
  return res.json({tag, photo, pendingRequests})
})

apiRouter.post('/upload-photo', upload.single('newUserPhoto'), async (req, res)=>{
  const currentUser = await getCurrentUser(req.currentUserId)
  const assetsFolder = path.join(path.dirname(import.meta.dirname), 'assets')
  const fileOriginalName = req.file.originalname, fileExtension = path.extname(req.file.originalname)
  const newFileName = path.basename(fileOriginalName, fileExtension) + "-" + uuidv4() + fileExtension
  
  console.log(newFileName)

  if(!fs.existsSync(assetsFolder)){
    fs.mkdirSync(assetsFolder)
  }

  if(currentUser.photo){
    fs.unlinkSync(path.join(assetsFolder, currentUser.photo))
  }

  fs.writeFileSync(path.join(assetsFolder, newFileName), req.file.buffer)
  await currentUser.update({photo: newFileName})

  io.emit('userNewPhotoAdded', {tag: req.currentUserTag, newFileName}) 
})

apiRouter.post('/send-friend-request', async (req, res)=>{
  const targetUserTag = req.body
  const doesTargetUserExist = await getCurrentUser(targetUserTag)

  if(!doesTargetUserExist){
    res.status(400).json({message: 'Something went wrong when sending new friend request!'})
  }

  const targetUserConnectionId = connectedUsers[targetUserTag]
  const currentUserTag = req.currentUserTag
  
  try{
    if(targetUserConnectionId && currentUserTag !== targetUserTag){
      const userSendingRequest = await getCurrentUser(req.currentUserId)
      await UserFriends.create({userId: req.currentUserId, friendId: doesTargetUserExist.id})
      io.to(targetUserConnectionId).emit("addNewContact", {fullName: userSendingRequest.fullName, photo: userSendingRequest.photo})
      res.status(200).json({message: 'New friend request sent'})
    }
    else{
      res.status(400).json({message: 'Something went wrong when sending new friend request!'})
    }

  }
  catch (error){
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({message: 'Something went wrong when sending new friend request!'})
    }
  }
})


apiRouter.post('/accept-new-contact', async (req, res)=>{
  const currentUserId = req.currentUserId

})

apiRouter.get('/verify-jwt-token', async(req, res)=>{
  return res.status(200).send({success:true})
})



export default apiRouter