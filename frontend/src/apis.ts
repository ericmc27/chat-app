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
    const data = await response.json()
    localStorage.setItem("currentUserPhoto", data.photo)
    window.location.href = "/chat"
  }

}

const uploadNewUserPhoto = async (fileObj: File)=>{
  const formData = new FormData()
  formData.append('newUserPhoto', fileObj)

  const response = await fetch("/api/upload-photo", {
    method: 'POST',
    body: formData,
  })

  if(response.status === 500){
    window.location.href = "/login"
  }
}

export {login, uploadNewUserPhoto}