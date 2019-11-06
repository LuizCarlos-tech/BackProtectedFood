module.exports = (sequelize, DataTypes) => {
    const Foods = sequelize.define('foods', {
      name: DataTypes.STRING,
      id_category: DataTypes.INTEGER,
      id_type: DataTypes.INTEGER,
    });

    Foods.associate = models => {
        Foods.hasMany(models.foods_micro,{
          foreignKey :'id_foods',
          as:'Foods_micro'
      });
    }
  return Foods;
}