module.exports = (sequelize, DataTypes) => {
    const Foods = sequelize.define('foods', {
      name: DataTypes.STRING,
      id_category: DataTypes.INTEGER,
      id_type: DataTypes.INTEGER,
    });

    Foods.associate = models => {
        Foods.hasMany(models.foods_micros,{
          foreignKey :'id_foods',
          as:'foods_micro'
      });
    }
  return Foods;
}