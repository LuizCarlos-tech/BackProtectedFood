module.exports = (sequelize, DataTypes) => {
    const Foods = sequelize.define('foods', {
      name: DataTypes.STRING,
      id_category: DataTypes.INTEGER,
      id_type: DataTypes.INTEGER,
    });

    Foods.associate = models => {
    Foods.belongsToMany(models.microorganisms,{
      through: 'Foods_micro',
      as: 'food_micros',
      foreignKey: 'id_foods',
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