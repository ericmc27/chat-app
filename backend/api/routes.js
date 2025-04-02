import { Router, User, path, uuidv4, fs, multer, jwt, verifyJwtMiddleware, io, getCurrentUser } from './imports.js';

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

apiRouter.use(verifyJwtMiddleware)


const storage = multer.memoryStorage()
const upload = multer({storage})

apiRouter.get('/get-current-user-data', async (req, res)=>{
  const currentUser = await getCurrentUser(req.currentUserId)
  const {tag, photo} = currentUser
  return res.json({tag, photo})
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

apiRouter.get('/verify-jwt-token', async(req, res)=>{
  return res.status(200).send({success:true})
})



export default apiRouter