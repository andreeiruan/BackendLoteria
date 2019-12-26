const Result = require('../models/Result')

module.exports = {
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