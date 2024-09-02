import * as Yup from 'yup'
import Products from '../models/Products'
import Category from '../models/Category'
import User from '../models/User'

//create
class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
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
    const { name, price, category_id, offer } = request.body

    const product = await Products.create({
      name,
      category_id,
      price,
      path,
      offer,
    })

    return response.status(201).json({ product })
  }

  //Update

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
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
    const findProduct = await Products.findByPk(id)

    if (!findProduct) {
      return response
        .staus(400)
        .json({ error: 'make sure your product ID is correct' })
    }

    let path
    if (request.file) {
      path = request.file.filename
    }

    const { name, price, category_id, offer } = request.body

    await Products.update(
      {
        name,
        category_id,
        price,
        path,
        offer,
      },
      {
        where: {
          id,
        },
      }
    )

    return response.status(200).json()
  }

  async index(request, response) {
    const products = await Products.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    })
    return response.json(products)
  }
}

export default new ProductController()
