const Game = require('../models/Game')
const TypeGame = require('../models/TypeGame')
const User = require('../models/User')
const Contest = require('../models/Contest')

module.exports = {
  async store(req, res){
    const id_user = req.userId
    const { id_type, id_contest, nums } = req.body

    if(!await User.findByPk(id_user)){
      return res.status(400).json({ error: 'User not found!'})
    }

    const type = await TypeGame.findByPk(id_type)
    
    if(!type){
      return res.status(400).json({ error: 'Type game incorrect!'})
    }    

    const contest = await Contest.findByPk(id_contest)
    
    if(!contest){
      return res.status(400).json({ error: 'Contest invalid!'})
    }
    if(type.id !== contest.id_type_game){
      return res.status(400).json({ error: 'Concurso e tipos não batem'})
    }

    if (contest.accomplished === true){
      return res.status(400).json({ error: 'Contest held'})
    }

    const numsGame = nums.split('-')
    if(numsGame.length > type.quantity_numbers ){
      return res.status(400).json({
        error: 'Exceded numbers per game'
      })
    }
    if(numsGame.length < type.quantity_numbers ){
      return res.status(400).json({
        error: 'minimum numbers per game'
      })
    }
    for(let num of numsGame){
      if (parseInt(num) > type.maximum_value || parseInt(num) < type.minimum_value){
        return res.status(400).json({
          error: `Number ${num} invalid!! `
        })
      }
    }  

    const game = await Game.create({
      id_type,
      id_user,
      id_contest,
      nums
    })

    return res.json(game)
  },
  async index(req, res){
    const { id_user } = req.params

    if (!await User.findByPk(id_user)) {
      return res.status(400).json({
        error: 'User not found!'
      })
    }
    
    const games = await Game.findAll({
      where: { id_user }
    })
    
    let lotofacil = []
    let megasena = []
    let quina = []

    for(let game of games){
      if(game.id_type === 1){
        lotofacil.push(game)
      }
      if(game.id_type === 2){
        megasena.push(game)
      }
      if(game.id_type === 3){
        quina.push(game)
      }    
    }
    const gamesOfPlayer = [lotofacil, megasena, quina]

    return res.json(gamesOfPlayer)
  },
  async show(req, res){
    const { id_user, id_type } = req.params

    const game = await Game.max('id', { where: { id_type, id_user }})
    
    if(isNaN(game)){
      return res.json({ msg: "Você não tem apostas"})
    }
    const lastGame = await Game.findByPk(game, { include: {
      association: 'contest'
    }})

    return res.json(lastGame)
  },
  async every(req, res){
    const { id_user, id_type } = req.params

    const games = await Game.findAll({
      where: {
        id_user,
        id_type
      },
      include: {
        association: 'contest'
      }     
    })

    return res.json(games)
  }
}