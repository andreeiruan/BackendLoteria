const Contest = require('../models/Contest')

module.exports = {
  async store(req, res){
    const { id_type_game, date} = req.body

    const contest = await Contest.create({
      id_type_game,
      date
    })

    return res.json(contest)
  },
  async index(req, res){
    const contests = await Contest.findAll({
      where: {accomplished: false},
      include: {association: 'type'}
    })

    return res.json(contests)
  },
  async show(req, res){
    const { id_type } = req.params
    const contests = await Contest.findAll({
      where: {
        id_type_game: id_type,
        accomplished: false
      },
      include: {association: 'type'}
    })
    return res.json(contests)
  },
  async showResults(req, res){
    const { id_type, id } = req.params
    const contest = await Contest.findOne({ where: {
      id
    }})

    return res.json(contest)
  }


}