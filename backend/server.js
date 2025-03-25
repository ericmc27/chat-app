import express from 'express'
import http from "http"
import cors from "cors"
import { Server } from 'socket.io'
import apiRouter from './api/routes.js'
import cookieParser from 'cookie-parser'
import { User } from './api/models.js'

const PORT = process.env.PORT || 9000
const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/assets', express.static('assets', {maxAge:31536000}))
app.use('/api', apiRouter)

export const io = new Server(server, {cors: {origin: 'http://localhost:5173', methods: ['GET', 'POST']}})
User.sync()

io.on('connection', ()=>{
  console.log("someone connected to the server")
})

server.listen(PORT, ()=>{
  console.log(`Server listening on http://localhost:${PORT}/`)
})