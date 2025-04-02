import jwt from "jsonwebtoken"

const verifyJwtMiddleware = (req, res, next) => {
  const token = req.cookies.jwtToken
  try {
      jwt.verify(token, process.env.SECRET_KEY)
      const decoded_token = jwt.decode(token)
      req.currentUserId = decoded_token.id
      req.currentUserTag = decoded_token.tag
      next()
  } catch {
    return res.status(500).send({success:false})
  }
}

export { verifyJwtMiddleware }