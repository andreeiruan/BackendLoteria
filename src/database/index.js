const Sequelize = require('sequelize')
const dbconfig = require('../config/database')

const User = require('../models/User')
const TypeGame = require('../models/TypeGame')
const Game = require('../models/Game')
const Contest = require('../models/Contest')
const Result = require('../models/Result')

// require('dotenv').config()
const connection = new Sequelize(dbconfig)

console.log( 'AQUI', process.env.DB_HOST)

Game.init(connection)
User.init(connection)
TypeGame.init(connection)
Contest.init(connection)
Result.init(connection)

Game.associate(connection.models)
User.associate(connection.models)
TypeGame.associate(connection.models)
Contest.associate(connection.models)
Result.associate(connection.models)

module.exports = connection