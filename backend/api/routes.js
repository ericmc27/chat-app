import { Router } from "express"
import { User } from "./models.js"
import jwt from "jsonwebtoken"

const apiRouter = Router()

apiRouter.post('/login', async (req, res)=>{
  const {email, password} = req.body
  const user = await User.findOne({where:{email, password}})

  if(user){
    const jwtToken = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: '15m'})
    res.cookie('jwtToken', jwtToken, {httpOnly: true})
    return res.status(200).json({"message":"successful login"})
  }

  return res.status(401).json({"message":"hello"})
})

apiRouter.get('/verify-jwt-token', async (req, res)=>{
  try {
    jwt.verify(req.cookies.jwtToken, process.env.SECRET_KEY)
    return res.status(200).send({success: true})
  } catch {
    return res.status(500).send({success:false})
  }
})



export default apiRouter