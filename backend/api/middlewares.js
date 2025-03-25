import jwt from "jsonwebtoken"

const verifyJwtMiddleware = (req, res, next) => {
  const token = req.cookies.jwtToken
  try {
      jwt.verify(token, process.env.SECRET_KEY)
      req.currentUserId = jwt.decode(token).id
      next()
  } catch {
    return res.status(500).send({success:false})
  }
}

export { verifyJwtMiddleware }