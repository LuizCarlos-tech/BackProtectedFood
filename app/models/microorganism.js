module.exports = (sequelize, DataTypes) => {
    const Microorganism = sequelize.define('microorganism', {
      name: DataTypes.STRING,
      id_category: DataTypes.INTEGER,
    });

    Microorganism.associate = models => {
        Microorganism.hasOne(models.Category,{
            foreignKey :'id_category',
            as:'Category'
        });

        Microorganism.hasMany(models.Foods_micro,{
          foreignKey :'id_micro',
          as:'Foods_micro'
      });
    }
  return Microorganism;
}