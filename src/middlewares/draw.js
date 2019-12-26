const Contest = require('../models/Contest')
const Result = require('../models/Result')
const TypeGame = require('../models/TypeGame')

function generateDraw(quantity, maximum) {
  let sorted = []

  for (let i = 0; i < quantity; i++) {
    const num = Math.round(Math.random() * maximum)
    if (num === 0) {
      i -= 1
    } else {
      if (sorted.includes(num)) {
        i -= 1
      } else {
        sorted.push(num)
      }
    }
  }

  sorted = sorted.sort((a, b) => a - b)

  let result = []
  for (let n of sorted) {
    result.push(n.toString())
  }
  return result.join('-')
}

module.exports = async function draw(req, res, next) {
    const contests = await Contest.findAll()
  
    const today = new Date
  
    for (contest of contests) {
      const dateContest = new Date(contest.date)
      if (today.getTime() >= dateContest.getTime() && contest.accomplished === false) {
        const type = await TypeGame.findByPk(contest.id_type_game)
  
        const sorted = generateDraw(type.quantity_numbers, type.maximum_value)
  
        await Result.create({
          id_contest: contest.id,
          result: sorted,
          type_game: contest.id_type_game
        })
  
        contest.update({
          accomplished: true
        })
  
      }
    }
    console.log('Sorteio realizado')
    return next()
  }