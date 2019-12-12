const { Model, DataTypes } = require('sequelize')

class Result extends Model{
  static init(sequelize){
    super.init({
      id_contest: DataTypes.INTEGER,
      result: DataTypes.STRING
    },
     {
       sequelize
     })
  }
  static associate(models){
    this.belongsTo(models.Contest, { foreignKey: 'id_contest', as: 'results'})
  }
}
module.exports = Result