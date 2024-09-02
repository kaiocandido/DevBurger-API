import * as Yup from 'yup'
import Category from '../models/Category'
import User from '../models/User'

class CategoryController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
    })

    try {
      schema.validateSync(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json({ error: error.errors })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)

    if (!isAdmin) {
      return response.status(401).json()
    }

    const { filename: path } = request.file
    const { name } = request.body

    const categoryExist = await Category.findOne({
      where: {
        name,
      },
    })

    if (categoryExist) {
      return response.status(400).json({ error: 'Category Alredy exist' })
    }

    const { id } = await Category.create({
      name,
      path,
    })

    return response.status(201).json({ id, name })
  }

  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
    })

    try {
      schema.validateSync(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json({ error: error.errors })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)

    if (!isAdmin) {
      return response.status(401).json()
    }

    const { filename: path } = request.file
    const { name } = request.body

    const categoryExist = await Category.findOne({
      where: {
        name,
      },
    })

    if (categoryExist) {
      return response.status(400).json({ error: 'Category Already exist' })
    }

    const { id } = await Category.create({
      name,
      path,
    })

    return response.status(201).json({ id, name })
  }

  //////////////////////////////////////////////

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
    })

    try {
      schema.validateSync(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json({ error: error.errors })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)

    if (!isAdmin) {
      return response.status(401).json()
    }

    const { id } = request.params

    const categoryFileExists = await Category.findByPk(id)

    if (!categoryFileExists) {
      return response
        .status(400)
        .json({ message: 'make sure your category is correct' })
    }

    let path
    if (request.file) {
      path = request.file.filename
    }

    const { name } = request.body

    if (name) {
      const categoryExist = await Category.findOne({
        where: {
          name,
        },
      })

      if (categoryExist && categoryExist.id == id) {
        return response.status(400).json({ error: 'Category Already exist' })
      }
    }

    await Category.update(
      {
        name, // Valores a serem atualizados
        path,
      },
      {
        where: {
          id, // Condição para identificar o registro a ser atualizado
        },
      }
    )

    return response.status(201).json()
  }

  async index(request, response) {
    const categories = await Category.findAll()
    return response.json(categories)
  }
}

export default new CategoryController()
