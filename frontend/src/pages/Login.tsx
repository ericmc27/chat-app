import React from "react"
import chatLogo from "../assets/icons8-chat-logo.png"
import signIn from "../assets/sign-in.png"
import { UserLogin } from "../interfaces"
import { login } from "../apis"

const Login: React.FC = ()=>{
  const [userLogin, setUserLogin] = React.useState<UserLogin>({email: '', password: ''})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const {id, value} = e.currentTarget
    setUserLogin({...userLogin, [id]: value})
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    login(userLogin)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleFormSubmit} className="flex flex-col items-center h-105 w-100 bg-[#2d3337] gap-3 rounded shadow-lg ">
        <img src={chatLogo} className="mt-4" alt="Form logo"/>
        <label htmlFor="email" className="text-2xl text-white">EMAIL</label>
        <input onChange={handleInputChange} id="email" type="email" className="p-2 border h-8 w-72 text-white rounded bg-[#434343] focus:bg-green-100 focus:outline-none focus:text-black" value={userLogin.email}/>
        <label htmlFor="password" className="text-2xl text-white">PASSWORD</label>
        <input onChange={handleInputChange} id="password" type="password" className="p-2 border h-8 w-72 text-white rounded bg-[#434343] focus:bg-green-100 focus:outline-none focus:text-black" value={userLogin.password}/>
        <label className="text-white me-38">Forgot password?</label>

        <input type="image" src={signIn} alt="Sign in"/>
    
        <label className="text-white">Don't have an account? Signup now</label>
      </form>
    </div>
  )
}

export default Login