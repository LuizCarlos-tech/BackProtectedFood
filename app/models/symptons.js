module.exports = (sequelize, DataTypes) => {
    const Symptoms = sequelize.define('symptoms', {
      description: DataTypes.STRING,
      id_micro: DataTypes.INTEGER,
    });

    Symptoms.associate = models => {

      Symptoms.belongsTo(models.microorganisms,{
        foreignKey :'id',
        as:'microorganisms'
      });

    }
  return Symptoms;
}