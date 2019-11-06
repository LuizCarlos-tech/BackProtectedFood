module.exports = (sequelize, DataTypes) => {
    const Foods_micro = sequelize.define('foods_micro', {
      id_foods: DataTypes.INTEGER,
      id_micro: DataTypes.INTEGER,
    });
    Foods_micro.associate = models => {
    }
  return Foods_micro;
  }