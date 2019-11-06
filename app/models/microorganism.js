module.exports = (sequelize, DataTypes) => {
    const Microorganism = sequelize.define('microorganism', {
      name: DataTypes.STRING,
      id_categories: DataTypes.INTEGER,
    });

    Microorganism.associate = models => {
      
        Microorganism.hasMany(models.foods_micro,{
          foreignKey :'id_micro',
          as:'Foods_micro'
      });
    }
  return Microorganism;
}