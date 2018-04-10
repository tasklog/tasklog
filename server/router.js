import { WebApp } from 'meteor/webapp'
import bodyParser from 'body-parser'
import express, { Router } from 'express'

const app = express()
const router = Router()

// connect to meteor
WebApp.connectHandlers.use(app)

// setup middlewares
app.use(bodyParser.json())

// setup API subroute
app.use('/api', router)

export { router }