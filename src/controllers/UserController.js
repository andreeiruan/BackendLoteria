const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth')

module.exports = {
  async store(req, res){
    const { name, email, password } = req.body

    if(password.length < 6){
      return res.status(406).json({ error: "Senha muito curta, 6 caracteres no mínimo!"})
    }

    const emailExists = await User.findAll({
      where: {
        email
      }
    })

    if(emailExists.length > 0){
      return res.status(400).json({ error: "Esse email já está cadastrado"})
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await User.create({ name, email, password: hash})

    user.password = undefined

    return res.json(user)
  },

  async auth(req, res){
    const { email, password } = req.body

    const user = await User.findOne({ where: { email }})

    if(!user){
      return res.status(400).json({ error: 'Usuário não encontrado!'})
    }
    
    if(!await bcrypt.compare(password, user.password)){
      return res.status(400).json({ error: "Senha invalida!"})
    }

    user.password = undefined

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400,
    })
    return res.json({user, token})
  },
  async show(req, res){
    const { id } = req.params

    const user = await User.findByPk(id)

    return res.json(user)
  }
}