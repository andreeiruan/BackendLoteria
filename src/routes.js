const express = require('express')
const nodeMailer = require('nodemailer')

const authMiddleware = require('./middlewares/auth')
const draw = require('./middlewares/draw')
const verification = require('./middlewares/verification')

const UserController = require('./controllers/UserController')
const TypeGameController = require('./controllers/TypeGameController')
const ContestController = require('./controllers/ContestController')
const GameController = require('./controllers/GameController')
const VerificationController = require('./controllers/VerificationController')

const routes = express.Router()

// Envio de email 
routes.get('/contador', (req, res) => {
  const { useragent, platform } = req.query
  
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS_EMAIL
    }
  })

  transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: process.env.USER_EMAIL,
    subject: 'Novo Acesso',
    text: `Portifolio tem um novo acesso: user agent ${useragent}, plataforma: ${platform}`
  }).then(info => {
    console.log('Enviouuu');
    return res.json(info)
  }).catch(err => {
    console.log(err);
  })
})


routes.get('/envio', (req, res) => {
  const { email, comentario } = req.query

  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS_EMAIL
    }
  })

  transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: process.env.USER_EMAIL,
    subject: 'Feedback',
    html: `<strong>O usuário ${email} deixou o seguinte feedback!</strong><br><p>${comentario}</p>`
  }).then(info => {
    console.log('Enviouuuu');
    return res.json(info)
  }).catch(err => {
    console.log(err);
  })
})

// User
routes.post('/users', UserController.store)
routes.post('/authenticate', UserController.auth)

// Middleware de Autenticação
routes.use(authMiddleware)
routes.get('/users/:id', UserController.show)

// Middleware de Sorteio de Verificação
routes.use(draw)
routes.use(verification)

// TypesGames
routes.post('/typesgame', TypeGameController.store)
routes.get('/typesgame', TypeGameController.index)

// Contest
routes.post('/contests', ContestController.store)
routes.get('/contests', ContestController.index)
routes.get('/contests/:id_type', ContestController.show)
routes.get('/contestsfortype/:id_type', ContestController.showContest)

// Games
routes.post('/games', GameController.store)
routes.get('/games/:id_user', GameController.index)
routes.get('/games/:id_user/:id_type', GameController.show)
routes.get('/everygames/:id_user/:id_type', GameController.every)

// Draw and verification
routes.get('/results/:type_game', VerificationController.showResults)

module.exports = routes