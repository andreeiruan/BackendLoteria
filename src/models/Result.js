const { Model, DataTypes } = require('sequelize')

class Result extends Model{
  static init(sequelize){
    super.init({
      id_contest: DataTypes.INTEGER,
      result: DataTypes.STRING,
      type_game: DataTypes.INTEGER
    },
     {
       sequelize
     })
  }
  static associate(models){
    this.belongsTo(models.Contest, { foreignKey: 'id_contest', as: 'results'})
    this.belongsTo(models.Result, {
      foreignKey: 'type_game', as: 'type'
    })
  }
}
module.exports = Result