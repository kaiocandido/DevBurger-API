import jwt from 'jsonwebtoken'
import auth from '../config/auth'

function authMid(request, response, next) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({ error: 'Token not provided' })
  }

  const token = authToken.split(' ')[1]

  jwt.verify(token, auth.secret, (err, decoded) => {
    if (err) {
      return response.status(401).json({ error: 'Token is invalid' })
    }

    request.userId = decoded.id

    return next()
  })
}

export default authMid
