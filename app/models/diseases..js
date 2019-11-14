module.exports = (sequelize, DataTypes) => {
    const Diseases = sequelize.define('diseases', {
      name: DataTypes.STRING,
      id_micro: DataTypes.INTEGER,
    });

    Diseases.associate = models => {

      Diseases.belongsTo(models.microorganisms,{
        foreignKey :'id_micro',
        as:'microorganisms'
      });

    }
  return Diseases;
}