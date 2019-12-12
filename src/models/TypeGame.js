const { Model, DataTypes } = require('sequelize')

class TypeGame extends Model{
  static init(sequelize){
    super.init({
      name: DataTypes.STRING,
      quantity_numbers: DataTypes.INTEGER,
      minimum_value: DataTypes.INTEGER,
      maximum_value: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'types_game'
    })
  }
  static associate(models){
    this.hasMany(models.Game, {foreignKey: 'id_type', as: 'types'})
    this.hasMany(models.Contest, { foreignKey: 'id_type_game', as: 'type'})
  }
}

module.exports = TypeGame