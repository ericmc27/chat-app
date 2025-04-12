import { queryClient } from "./main"

const checkJwtLoader = async ()=>{
  const response = await fetch('/api/verify-jwt-token')

  if (response.status === 200) {
    return true
  } else {
    window.location.href = "/"
    return false
  }
}

const userDataLoader = async ()=>{
  const cachedData = queryClient.getQueryData(["currentUserData"])

  if (cachedData){
    return cachedData
  }

  const response = await fetch('/api/get-current-user-data', {
    method: 'GET'
  })
  const data = await response.json()
  return data
}

const chatLoader = async ()=>{
  const jwt = await checkJwtLoader()
  
  if(!jwt){
    return false
  }

  const userData = await userDataLoader()

  return userData
}


export { chatLoader }