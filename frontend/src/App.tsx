import { createBrowserRouter } from "react-router-dom"
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



// function App() {

//   return (
//     <>
//       <div>hello</div>
//     </>
//   )
// }

// export default App
