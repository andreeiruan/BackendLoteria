const Contest = require('../models/Contest')
const Game = require('../models/Game')
const Result = require('../models/Result')

module.exports = async function verificationGames(req, res, next) {
  let winners = []

  const contests = await Contest.findAll({
    where: {
      checked: false,
      accomplished: true
    }
  })

  if (contests.length > 0) {
    for (contest of contests) {
      const games = await Game.findAll({
        where: {
          id_contest: contest.id
        },
        include: {
          association: 'player'
        }
      })

      const result = await Result.findOne({
        where: {
          id_contest: contest.id
        }
      })
      const con = `${contest.id}`

      for (let g of games) {
        if (g.nums === result.result) {
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


  } else {
    console.log("NÃO FOI VERIFICADO NENHUM JOGO");
    return next()
  }


 console.log(`GANHADORES ${winners}`);
 return next()
}