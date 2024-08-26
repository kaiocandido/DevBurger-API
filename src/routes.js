import { Router } from 'express'
import User from './app/models/User'
import { v4 as uuidv4 } from 'uuid'

/*
Route using Express to interact with a user model to create a new user in the database.
This code sets up a GET route at the root ('/') that creates a new user in the database with fixed information and a generated UUID. 
If the user creation is successful, the user is returned with a 201 status. If an error occurs, a response with a status of 401 and an error message is returned. 
The router configuration is then exported for use in other parts of the application.
*/
const router = new Router()

router.get('/', async (request, response) => {
  try {
    const user = await User.create({
      id: uuidv4(),
      name: 'alanaaa222',
      email: 'alanaaaa222.cand@gmail.com',
      password_hash: 'fffafffffaaf',
    })
    return response.status(201).json(user)
  } catch (error) {
    return response.status(401).json({ message: 'error' })
  }
})

export default router
