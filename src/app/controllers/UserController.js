import User from '../models/User'

class UserController {
  async store (req, res) {
    if (
      !req.body.email ||
      !req.body.name ||
      !req.body.password ||
      !req.body.confirmPassword
    ) {
      return res.status(400).json({ error: 'Validation error' })
    }

    const userExists = await User.findOne({ where: { email: req.body.email } })

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ error: 'Password dont match' })
    }

    const { id, name, email } = await User.create(req.body)

    return res.json({ id, name, email })
  }

  async update (req, res) {
    if (!req.body.email || !req.body.name) {
      return res.status(400).json({ error: 'Validation error' })
    }

    const user = await User.findOne({ where: { email: req.body.email } })

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    if (req.body.password) {
      if (!req.body.confirmPassword) {
        return res.status(400).json({ error: 'Validatioin error' })
      }

      if (user.checkPassword(req.body.oldPassword)) {
        return res.status(400).json({ error: 'Wrong password' })
      }

      const { name, id } = await user.update(req.body)

      return res.json({ name, id, message: 'Password updated' })
    }

    const { name, id } = await user.update(req.body)
    return res.json({ id, name, message: 'User updated' })
  }
}

export default new UserController()
