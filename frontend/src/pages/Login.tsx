import React, { use } from "react"
import chatLogo from "../assets/icons8-chat-48.png"
import signIn from "../assets/sign-in.png"
import { UserLogin } from "../interfaces"

const Login: React.FC = ()=>{
  const [userLogin, setUserLogin] = React.useState<UserLogin>({email: '', password: ''})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const {id, value} = e.currentTarget
    setUserLogin({...userLogin, [id]: value})
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col items-center h-105 w-100 bg-[#596267] gap-3 rounded">
        <img src={chatLogo} className="mt-4"/>
        <label htmlFor="email" className="text-2xl text-white">EMAIL</label>
        <input onChange={handleInputChange} id="email" type="email" className="p-2 border h-8 w-72 text-white rounded bg-[#434343] focus:bg-green-100 focus:outline-none focus:text-black" value={userLogin.email}/>
        <label htmlFor="password" className="text-2xl text-white">PASSWORD</label>
        <input onChange={handleInputChange} id="password" type="password" className="p-2 border h-8 w-72 text-white rounded bg-[#434343] focus:bg-green-100 focus:outline-none focus:text-black" value={userLogin.password}/>
        <label className="text-white me-38">Forgot password?</label>
        <img src={signIn} className="hover:cursor-pointer"/>
        <label className="text-white">Don't have an account? Signup now</label>
      </form>
    </div>
  )
}

export default Login