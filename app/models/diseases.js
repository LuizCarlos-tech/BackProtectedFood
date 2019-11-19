module.exports = (sequelize, DataTypes) => {
    const Diseases = sequelize.define('diseases', {
      name: DataTypes.STRING,
    });

    Diseases.associate = models => {

      Diseases.hasMany(models.microorganisms,{
        foreignKey :'id',
        as:'microorganisms'
      });

    }
  return Diseases;
}