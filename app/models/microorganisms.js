module.exports = (sequelize, DataTypes) => {
    const Microorganism = sequelize.define('microorganisms', {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      url_image: DataTypes.STRING
    });

    Microorganism.associate = models => {
      
      Microorganism.hasOne(models.symptoms,{
        foreignKey :'id',
        as:'symptoms'
      });

      Microorganism.hasMany(models.diseases,{
        foreignKey :'id',
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