"use client"
import React from "react";
import { UserSignup } from "@/app/user/types";
import { signUp } from "@/lib/auth-client";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignupForm = ()=> {
  const [signupData, setSignupData] = React.useState<UserSignup>({name: '', email: '', password: ''})
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const {name, email, password} = signupData
    signUp.email({name, email, password}, {onError: (ctx)=>(console.log(ctx.error))})
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    const {id, value} = e.target
    setSignupData(prev => ({...prev, [id]:value}))
  }

  return (
    <form onSubmit={handleSubmit} className="border border-black bg-white rounded mx-auto my-auto h-90 w-85">
      <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" value={signupData.name} onChange={handleChange}/>

        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={signupData.email} onChange={handleChange}/>

        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={signupData.password} onChange={handleChange}/>

        <Button size={"lg"}>signup</Button>
    </form>
  )
}

export default SignupForm