module.exports = (sequelize, DataTypes) => {
    const Foods_micro = sequelize.define('foods_micros', {
      id_foods: DataTypes.INTEGER,
      id_micro: DataTypes.INTEGER,
    });

  return Foods_micro;
  }