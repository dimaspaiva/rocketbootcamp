import jwt from 'jsonwebtoken'

import User from '../models/User'
import authConfig from '../../config/authConfig'

class SessionCotroller {
  async store (req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ error: 'Validation error' })
    }

    const { email, password } = req.body

    const user = await User.findOne({ where: { email: email } })

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'User not found' })
    }

    const { id, name } = user

    return res.json({
      user: {
        id,
        name,
        email
      },
      token: jwt.sign({ id, name }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    })
  }
}

export default new SessionCotroller()
