import Sequelize from 'sequelize'
import User from '../app/models/User'
import configDatebase from '../config/database'
import Product from '../app/models/Products'
const models = [User, Product]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(configDatebase)
    models.map((model) => model.init(this.connection))
  }
}

export default new Database()
