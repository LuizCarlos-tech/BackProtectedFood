module.exports = (sequelize, DataTypes) => {
    const Diseases = sequelize.define('diseases', {
      name: DataTypes.STRING,
    });

    Diseases.associate = models => {

      Diseases.belongsToMany(models.symptoms,{
        through: 'Diseases_symptoms',
        as: 'diseases_symptoms',
        foreignKey: 'id_disease',
      });

      Diseases.hasMany(models.microorganisms,{
        foreignKey :'id',
        as:'microorganisms'
      });

    }
  return Diseases;
}