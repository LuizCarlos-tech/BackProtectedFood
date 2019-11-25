module.exports = (sequelize, DataTypes) => {
    const Symptoms = sequelize.define('symptoms', {
      description: DataTypes.STRING,
    });

    Symptoms.associate = models => {

      Symptoms.belongsToMany(models.diseases,{
        through: 'Diseases_symptoms',
        as: 'diseases_symptoms',
        foreignKey: 'id_symptom',
      });
    }
  return Symptoms;
}