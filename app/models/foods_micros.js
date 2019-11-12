module.exports = (sequelize, DataTypes) => {
    const Foods_micro = sequelize.define('foods_micros', {
      id_foods: DataTypes.INTEGER,
      id_micro: DataTypes.INTEGER,
    });
    Foods_micro.associate = models => {
    
      Foods_micro.belongsTo(models.foods,{
      foreignKey :'id_foods',
      as:'Food'
      });
      Foods_micro.belongsTo(models.microorganisms,{
       foreignKey :'id_micro',
       as:'Microorganism'
       });
  }
  return Foods_micro;
  }