const Contest = require('../models/Contest')
const Game = require('../models/Game')
const Result = require('../models/Result')

module.exports = {
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
   },
   async showResults(req, res){
     const { type_game } = req.params

    const lastResult = await Result.max('id', {
      where: {
        type_game: type_game
      }
    })
    const result = await Result.findByPk(lastResult, {
      include: { association: 'results'} 
    })

    res.json(result)
   }
}