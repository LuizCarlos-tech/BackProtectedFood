module.exports = (sequelize, DataTypes) => {
    const  Type = sequelize.define('types', {
      type: DataTypes.STRING,
    });

    Type.associate = models => {
        Type.hasMany(models.foods,{
            foreignKey : 'id_type',
            as : 'foods'
        });
      }
  return Type;
}