module.exports = (sequelize, DataTypes) => {
    const  Type = sequelize.define('foods', {
      type: DataTypes.STRING,
    });

    Type.associate = models => {
        Type.hasMany(models.Foods,{
            foreignKey : 'id_type',
            as : 'foods'
        });
      }
  return Type;
}