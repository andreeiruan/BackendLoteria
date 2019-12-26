const express = require('express')

const authMiddleware = require('./middlewares/auth')
const draw = require('./middlewares/draw')

const UserController = require('./controllers/UserController')
const TypeGameController = require('./controllers/TypeGameController')
const ContestController = require('./controllers/ContestController')
const GameController = require('./controllers/GameController')
const VerificationController = require('./controllers/VerificationController')

const routes = express.Router()


// User

routes.post('/users', UserController.store)
routes.post('/authenticate', UserController.auth)

// Middleware de Autenticação
routes.use(authMiddleware)
routes.use(draw)
routes.get('/users/:id', UserController.show)

// TypesGames
routes.post('/typesgame', TypeGameController.store)
routes.get('/typesgame', TypeGameController.index)

// Contest
routes.post('/contests', ContestController.store)
routes.get('/contests', ContestController.index)
routes.get('/contests/:id_type', ContestController.show)
routes.get('/contestsfortype/:id_type', ContestController.showContest)
// routes.get('/contests/:id_contest', ContestController.show)

// Games
routes.post('/games', GameController.store)
routes.get('/games/:id_user', GameController.index)
routes.get('/games/:id_user/:id_type', GameController.show)
routes.get('/everygames/:id_user/:id_type', GameController.every)

// Draw and verification
routes.get('/verification', VerificationController.verificationGames)
routes.get('/results/:type_game', VerificationController.showResults)


module.exports = routes