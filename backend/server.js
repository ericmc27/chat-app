import express from 'express'
import apiRouter from './api/routes.js'
import cookieParser from 'cookie-parser'
import { User } from './api/models.js'

const PORT = process.env.PORT || 9000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api', apiRouter)

User.sync()

app.listen(PORT, ()=>{
  console.log(`Server listening on http://localhost:${PORT}/`)
})