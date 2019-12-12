const { Model, DataTypes } = require('sequelize')

class Contest extends Model{
  static init(sequelize){
    super.init({
      id_type_game: DataTypes.INTEGER,
      date: DataTypes.DATE,
      accomplished: DataTypes.BOOLEAN,
      checked: DataTypes.BOOLEAN
    }, {
      sequelize,
      tableName: 'contests'
    })
  }
  static associate(models){
    this.hasMany(models.Game, { foreignKey: 'id_contest', as: 'cont'})
    this.belongsTo(models.TypeGame, { foreignKey: 'id_type_game', as: 'type'})
    this.hasMany(models.Game, { foreignKey: 'id_contest', as: 'contestgame'})
  }
}

module.exports = Contest