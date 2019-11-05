module.exports = (sequelize, DataTypes) => {
    const Foods = sequelize.define('foods', {
      name: DataTypes.STRING,
      id_category: DataTypes.INTEGER,
      id_type: DataTypes.INTEGER,
    });

    Foods.associate = models => {
        Foods.hasOne(models.Category,{
            foreignKey :'id_category',
            as:'Category'
        });
        Foods.hasOne(models.Type,{
            foreignKey :'id_type',
            as:'Type'
        });
        Foods.hasMany(models.Foods_micro,{
          foreignKey :'id_foods',
          as:'Foods_micro'
      });
    }
  return Foods;
}