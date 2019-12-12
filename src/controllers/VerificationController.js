const Contest = require('../models/Contest')
const Game = require('../models/Game')
const Result = require('../models/Result')
const TypeGame = require('../models/TypeGame')

function generateDraw(quantity, maximum){
  let sorted = []

  for (let i = 0; i < quantity; i++) {
    const num = Math.round(Math.random() * maximum)
    if(num === 0){
      i -= 1
    }else{
      if (sorted.includes(num)) {
        i -= 1
      } else {
        sorted.push(num)
      }
    }
  }
  
  sorted = sorted.sort((a, b) => a - b)

  let result = []
  for(let n of sorted){
    result.push(n.toString())
  }
  return result.join('-')
}

module.exports = {
  async draw(req, res){
    const contests = await Contest.findAll()

    const today = new Date

    for(contest of contests){
      const dateContest = new Date(contest.date)
      if(today.getTime() >= dateContest.getTime() && contest.accomplished === false){
          const type = await TypeGame.findByPk(contest.id_type_game)

          const sorted = generateDraw(type.quantity_numbers, type.maximum_value)

          const result = await Result.create({
           id_contest: contest.id,
           result: sorted
          })

          contest.update({
            accomplished: true
          })

      }
    }
    return res.json(contests)
  },
  async verificationGames(req, res){
    let winners = []

    const contests = await Contest.findAll({
      where: {
        checked: false,
        accomplished: true
      }
     })

     if(contests.length > 0){
       for(contest of contests){
        const games = await Game.findAll({ 
          where: { id_contest: contest.id}, 
          include: { association: 'player'
        }})

        const result = await Result.findOne({ where: { id_contest: contest.id }})  
          const con = `${contest.id}`

          for(let g of games){
            if(g.nums === result.result){
              winners.push({
                winner: `${contest.id}: ${g.player.name}`
              })
            }      
          }
          contest.update({
            checked: true
          })
          contest.save()
       }
  

     }else{
       return res.json({ msg: 'Não existe jogo para verificar' })
     }

  
    return res.json(winners)
   }
}