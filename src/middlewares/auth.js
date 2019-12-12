const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
  const { authorization } = req.headers

  if(!authorization){
    return res.status(401).json({ error: "Token não informado"})
  }

  const partsToken = authorization.split(' ')

  if(!partsToken.length === 2){
    return res.status(401).json({ error: "Token incorreto"})
  }
  
  const [ scheme, token ] = partsToken

  if(!/^Bearer$/i.test(scheme)){
    return res.status(401).json({ error: "Token mal formatado"})
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if(err){
      return res.status(401).json({error: "Token invalido"})
    }

    req.userId = decoded.id
    return next()
  })
}