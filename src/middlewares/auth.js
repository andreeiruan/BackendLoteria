const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

module.exports = (req, res, next) => {
  //  Por padrão o jwt manda o token pelo cabeçalho da requisição com a chave authorization
  const { authorization } = req.headers

  //  Verifica se não existe essa chave no cabeçalho da requisção
  if(!authorization){
    return res.status(401).json({ error: "Token não informado"})
  }

  // Separa o token em duas partes para a verificação 
  const partsToken = authorization.split(' ')

  //  Se o token não tiver duas partes ele esta incorreto
  if(!partsToken.length === 2){
    return res.status(401).json({ error: "Token incorreto"})
  }
  
  const [ scheme, token ] = partsToken

  //  Por padrão o token jwt vem com a palavra "Bearer" primeiro
  if(!/^Bearer$/i.test(scheme)){
    return res.status(401).json({ error: "Token mal formatado"})
  }

  // Verificação se o token é valido ou não com a função verify
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if(err){
      return res.status(401).json({error: "Token invalido"})
    }

    req.userId = decoded.id
    return next()
  })
}