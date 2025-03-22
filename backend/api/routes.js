import { Router } from "express"

const apiRouter = Router()

apiRouter.get('/login', (req, res)=>{
  res.send('Hello from the api!')
})

export default apiRouter