import User from '../models/User'
import { v4 } from 'uuid'
import * as Yup from 'yup'

/* 
  It communicates with our bank and through the store function, which is a post that is in a router, we create a user
*/

class UserController {
  async store(request, response) {
    /* Filter using YUP to validate parameters*/
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password_hash: Yup.string().min(6).required(),
      admin: Yup.boolean(),
    })

    /* Checking if the parameters are correct being password, email, name, and if the user is admin*/
    try {
      schema.validateSync(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json({ error: error.errors })
    }

    const { name, email, password_hash, admin } = request.body
    try {
      /* Validating the same emails with sequelize*/
      const userExists = await User.findOne({
        where: {
          email,
        },
      })

      if (userExists) {
        return response.status(400).json({ error: 'User already exists' })
      }

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
