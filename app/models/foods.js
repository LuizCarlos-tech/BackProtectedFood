module.exports = (sequelize, DataTypes) => {
    const Foods = sequelize.define('foods', {
      name: DataTypes.STRING,
      id_category: DataTypes.INTEGER,
      id_type: DataTypes.INTEGER,
    });

    Foods.associate = models => {
    Foods.hasMany(models.foods_micros,{
          foreignKey :'id_foods',
          as:'foods_micros'
      });
    Foods.belongsTo(models.categories,{
        foreignKey :'id_category',
        as:'categories'
      });
    Foods.belongsTo(models.types,{
        foreignKey :'id_type',
        as:'types'
    });
    }
  return Foods;
}