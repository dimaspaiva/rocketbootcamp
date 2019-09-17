import { Router } from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import auth from './app/middlewares/auth'

const routes = new Router()

routes.get('/', (req, res) => res.json({ message: 'Welcome to MeetApp API' }))

routes.post('/users', UserController.store)

routes.put('/users', auth, UserController.update)

routes.post('/auth', SessionController.store)

export default routes
