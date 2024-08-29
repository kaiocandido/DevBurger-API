/* 
WHAT WAS DONE"

It communicates with our bank and through the store function, which is a post that is in a router, we create a user
Checking if the parameters are correct being password, email, name, and if the user is admin
Validating the same emails with sequelize
*/
import User from '../models/User'
import { v4 } from 'uuid'
import * as Yup from 'yup'
class UserController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean(),
    })

    try {
      schema.validateSync(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json({ error: error.errors })
    }

    const { name, email, password, admin } = request.body
    try {
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
        password,
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
