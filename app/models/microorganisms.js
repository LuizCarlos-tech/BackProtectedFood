module.exports = (sequelize, DataTypes) => {
    const Microorganism = sequelize.define('microorganisms', {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      id_disease: DataTypes.INTEGER
    });

    Microorganism.associate = models => {

      Microorganism.belongsTo(models.diseases,{
        foreignKey :'id_disease',
        as: 'diseases'
      });

      Microorganism.belongsToMany(models.foods,{
        through: 'Foods_micro',
        as: 'food_micros',
        foreignKey: 'id_micro',
      });

    }
  return Microorganism;
}