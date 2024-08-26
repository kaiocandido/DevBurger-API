import User from '../models/User'
import { v4 } from 'uuid'

/* 
  It communicates with our bank and through the store function, which is a post that is in a router, we create a user
*/

class UserController {
  async store(request, response) {
    const { name, email, password_hash, admin } = request.body
    try {
      const user = await User.create({
        id: v4(),
        name,
        email,
        password_hash,
        admin,
      })
      return response.status(201).json({
        id: user.id,
        name,
        email,
        admin,
      })
    } catch (error) {
      console.error('Error creating user:', error)
      return response.status(500).json({ message: 'Error creating user' })
    }
  }
}

export default new UserController()
