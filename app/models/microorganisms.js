module.exports = (sequelize, DataTypes) => {
    const Microorganism = sequelize.define('microorganisms', {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      url_image: DataTypes.STRING,
      id_disease: DataTypes.INTEGER
    });

    Microorganism.associate = models => {
      
      Microorganism.hasMany(models.symptoms,{
        foreignKey :'id_micro',
        as:'symptoms'
      });

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