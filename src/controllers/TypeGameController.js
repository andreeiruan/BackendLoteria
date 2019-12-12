const TypeGame = require('../models/TypeGame')

module.exports = {
  async store(req, res){
    const { name, quantity_numbers, minimum_value, maximum_value } = req.body

    const type = await TypeGame.create({ 
      name, 
      quantity_numbers, 
      minimum_value, 
      maximum_value
    })

    return res.json(type)
  }, 
  async index(req, res){
    const types = await TypeGame.findAll()

    res.json({types, user: req.userId})
  }
}