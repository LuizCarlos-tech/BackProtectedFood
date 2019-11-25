module.exports = (sequelize, DataTypes) => {
  const Diseases_symptoms = sequelize.define('diseases_symptoms', {
    id_disease: DataTypes.INTEGER,
    id_symptom: DataTypes.INTEGER,
  });
  Diseases_symptoms.associate = models => {
  
    Diseases_symptoms.belongsTo(models.diseases,{
    foreignKey :'id_disease',
    as:'Disease'
    });
    Diseases_symptoms.belongsTo(models.symptoms,{
     foreignKey :'id_symptom',
     as:'Symptom'
     });
}
return Diseases_symptoms;
}