import { createBrowserRouter } from "react-router-dom"
import { io } from "socket.io-client"
import Login from "./pages/Login"
import Chat from "./pages/Chat"
import { checkJwtLoader } from "../loaders"

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/chat',
    loader: checkJwtLoader,
    element: <Chat/>
  }
])

const socket = io('http://localhost:3001')

socket.on('connect', ()=>{
  console.log("connected")
})

socket.on('userNewPhotoAdded', ()=>{
  console.log("i added a new photo")
})


function App() {
  return (
    <>
      <div>hello</div>
    </>
  )
}

export default App
