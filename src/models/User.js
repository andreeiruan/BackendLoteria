const { Model, DataTypes } = require('sequelize')


class User extends Model{
  static init(sequelize){
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
      }
    },  {
      sequelize
    })
  }
  static associate(models){
    this.hasMany(models.Game, { foreignKey: 'id_user', as: 'games'}) 
  }
}

module.exports = User