import Sequelize from 'sequelize'
import mongoose from 'mongoose'
import User from '../app/models/User'
import Product from '../app/models/Products'
import Category from '../app/models/Category'
import configDatabase from '../config/database'

const models = [User, Product, Category]

class Database {
  constructor() {
    this.init() // Inicializa a conexão com o banco de dados SQL
    this.mongo() // Inicializa a conexão com o MongoDB
  }

  init() {
    this.connection = new Sequelize(configDatabase)

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }

  async mongo() {
    this.mongoConnection = await mongoose.connect(
      'mongodb://localhost:27017/burguer'
    )
  }
}

export default new Database()
