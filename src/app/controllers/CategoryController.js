import * as Yup from 'yup'
import Category from '../models/Category'

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
    })

    return response.status(201).json({ id, name })
  }

  async index(request, response) {
    const categories = await Category.findAll()
    return response.json(categories)
  }
}

export default new CategoryController()
