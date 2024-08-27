import * as Yup from 'yup'
import Products from '../models/Products'

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category: Yup.string().required(),
    })

    try {
      schema.validateSync(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json({ error: error.errors })
    }

    const { filename: path } = request.file
    const { name, price, category } = request.body

    const product = await Products.create({
      name,
      category,
      price,
      path,
    })

    return response.status(201).json({ product })
  }

  async index(request, response) {
    const products = await Products.findAll()
    return response.json(products)
  }
}

export default new ProductController()
