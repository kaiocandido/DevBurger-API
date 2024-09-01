/*
Imports the jsonwebtoken module to verify and decode JWT tokens
Imports the authentication configuration, which includes the secret used to sign the tokens
Sets the authentication middleware
Gets the authentication token from the request header
Checks if the token was provided
If no token is provided, responds with a 401 (Unauthorized) status and an error message
The token is usually in the format "Bearer <token>". Splits the string and gets the token
Verifies and decodes the token using the secret defined in the configuration if there is an error verifying the token (e.g., invalid or expired token)
Responds with a 401 (Unauthorized) status and an error message
If the token is valid, adds the decoded user ID to the request object
Passes control to the next middleware or route
*/
import jwt from 'jsonwebtoken'
import auth from '../../config/auth'

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
    request.userName = decoded.name

    return next()
  })
}

export default authMid
