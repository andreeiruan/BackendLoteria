const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth')

module.exports = {
  async store(req, res){
    const { name, email, password } = req.body

    // Verificação se o email já existe
    const emailExists = await User.findAll({
      where: {
        email
      }
    })    
    if(emailExists.length > 0){
      return res.json({ error: "Esse email já está cadastrado"})
    }

    // Verificaçaõ de senha segura
    if(password.length < 6){
      return res.json({ error: "Senha muito curta, 6 caracteres no mínimo!"})
    }

    // Transforma a senha do usuario em um hash para armazenamento seguro das senhas
    const hash = await bcrypt.hash(password, 10)
    
    // Cria o usuário
    const user = await User.create({ name, email, password: hash})

    // faz o password do usuário ficar em undefined para não retornar com os outros dados
    user.password = undefined

    return res.json({user: true})
  },
  async auth(req, res){
    // Login
    const { email, password } = req.body

    // Busca o email digitado
    const user = await User.findOne({ where: { email }})

    // Verificaçaõ de existência do email criado
    if(!user){
      return res.json({ error: 'Email não encontrado'})
    }
    
    // Compara os hash, da senha digitada com a senha armazenada no banco de dados
    if(!await bcrypt.compare(password, user.password)){
      return res.json({ error: "Senha inválida"})
    }

    // faz o password do usuário ficar em undefined para não retornar com os outros dados
    user.password = undefined

    // Gera um token de autenticação 
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400, // Token expira em um dia
    })
    return res.json({user, token})
  },
  async show(req, res){
    const { id } = req.params

    const user = await User.findByPk(id)

    return res.json(user)
  }
}