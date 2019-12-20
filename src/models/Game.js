const { Model, DataTypes } = require('sequelize')

class Game extends Model{
  static init(sequelize){
    super.init({
      id_type: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
      id_contest: DataTypes.INTEGER,
      nums: DataTypes.STRING
    }, {
      sequelize
    })
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id_user', as: 'player'})
    this.belongsTo(models.TypeGame, { foreignKey: 'id_type', as: 'type_game' })
    this.belongsTo(models.Contest, { foreignKey: 'id_contest', as: 'contest'})
    this.belongsTo(models.Result, { foreignKey: 'id_type', as: 'result'})
  }
}

module.exports = Game