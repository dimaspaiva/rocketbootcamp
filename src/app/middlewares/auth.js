import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import authConfig from '../../config/authConfig'

export default async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [type, token] = authHeader.split(' ')
  if (!type || !token) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)
    req.userId = decoded.id

    next()
  } catch (error) {
    return res.status(400).json({ error: 'Invalid token' })
  }
}
