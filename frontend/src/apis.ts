import { UserLogin } from "./interfaces"

const login = async ({email, password}: UserLogin)=>{
  const body = {email, password}

  const response = await fetch('/api/login',
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  
  if(response.status === 200){
    window.location.href = "/chat"
  }

}

export {login}