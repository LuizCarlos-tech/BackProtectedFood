module.exports = (sequelize, DataTypes) => {
  const  Type = sequelize.define('types', {
    type: DataTypes.STRING,
    control_measure: DataTypes.TEXT,
  });

  Type.associate = models => {
      Type.hasMany(models.foods,{
          foreignKey : 'id_type',
          as : 'foods'
      });
    }
return Type;
}