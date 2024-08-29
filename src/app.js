/* 
"WHAT WAS DONE"

This code defines a basic configuration for an Express application using an App class:
Application creation: Configures the Express instance.
Middlewares: Adds a middleware to process JSON.
Routes: Configures routes using a routing module
*/
import express from 'express'
import routes from '../src/routes'
import './database'
import { resolve } from 'node:path'

class App {
  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
  }
  middlewares() {
    this.app.use(express.json())
    this.app.use(
      '/product-file',
      express.static(resolve(__dirname, '..', 'uploads'))
    )
  }
  routes() {
    this.app.use(routes)
  }
}

export default new App().app
