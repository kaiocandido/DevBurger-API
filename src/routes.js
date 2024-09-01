/*
"WHAT WAS DONE"

Imports the Express Router module to define routes
Imports the controllers to handle user, session, and product requests
Imports multer to handle file uploads
Imports the multer configuration to define how files should be stored
Imports the authentication middleware that checks if the user is authenticated
Creates a new Router instance to define the routes
Configures multer with the configuration defined for file uploads
Sets the route to create a new user by calling the UserController's `store` method
Sets the route to create a new session by calling the SessionController's `store` method
Applies the authentication middleware to all the routes below
Sets the route to create a new product by using multer to upload a file (if present)
Calls the ProductController's `store` method to handle product creation
Sets the route to list all products by calling the ProductController's `index` method
Exports the defined routes so that can be used in other parts of the application
*/
import { Router } from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductController from './app/controllers/ProductController'
import multer from 'multer'
import multerConfig from './config/multer'
import authMid from './app/middlewares/auth'
import CategoryController from './app/controllers/CategoryController'
import OrderController from './app/controllers/OrderController'

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

routes.use(authMid)

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)

routes.post('/orders', OrderController.store)

export default routes
