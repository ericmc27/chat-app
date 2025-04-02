const checkJwtLoader = async ()=>{
  const response = await fetch('/api/verify-jwt-token')

  if (response.status === 200) {
    return true
  } else {
    window.location.href = "/login"
    return false
  }
}


export { checkJwtLoader }