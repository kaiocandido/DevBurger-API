import { Router } from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductController from './app/controllers/ProductController'
import multer from 'multer'
import multerConfig from './config/multer'
import authMid from './middlewares/auth'

const routes = new Router()

const upload = multer(multerConfig)

routes.post('/users', UserController.store)

routes.post('/session', SessionController.store)

routes.use(authMid)
routes.post('/products', upload.single('file'), ProductController.store)

routes.get('/products', ProductController.index)

export default routes
