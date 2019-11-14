module.exports = (sequelize, DataTypes) => {
    const Microorganism = sequelize.define('microorganisms', {
      name: DataTypes.STRING,
      id_category: DataTypes.INTEGER,
    });

    Microorganism.associate = models => {
      
      Microorganism.hasOne(models.symptoms,{
        foreignKey :'id_micro',
        as:'symptoms'
      });

      Microorganism.belongsToMany(models.foods,{
        through: 'Foods_micro',
        as: 'food_micros',
        foreignKey: 'id_micro',
      });

      Microorganism.belongsTo(models.categories,{
        foreignKey :'id_category',
        as:'categories'
      });

    }
  return Microorganism;
}