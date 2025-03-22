import express from 'express'
import apiRouter from './api/routes.js'
import { User } from './api/models.js'

const PORT = process.env.PORT || 9000
const app = express()

app.use('/api', apiRouter)

User.sync()

app.listen(PORT, ()=>{
  console.log(`Server listening on http://localhost:${PORT}/`)
})