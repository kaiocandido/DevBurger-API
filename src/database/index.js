/*
"WHAT WAS DONE"

Imports Sequelize, which is an ORM library for interacting with SQL databases
Imports the models that will be used to map database tables
Imports the database configurations, such as credentials and connection details
Defines an array with all the models that will be initialized
Defines the Database class that manages the database connection and model initialization
Calls the init method in the constructor to ensure that the connection and model initialization are performed when the class is instantiated
Method for configuring the database connection and initializing the models
Creates a new instance of Sequelize with the database configuration
Iterates over each model and calls the `init` method passing the Sequelize connection
Exports a new instance of the Database class to be used in other modules
*/
import Sequelize from 'sequelize'
import User from '../app/models/User'
import Product from '../app/models/Products'
import configDatebase from '../config/database'

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
