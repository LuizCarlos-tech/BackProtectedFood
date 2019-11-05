module.exports = (sequelize, DataTypes) => {
    const Foods_micro = sequelize.define('foods_micro', {
      id_foods: DataTypes.INTEGER,
      id_micro: DataTypes.INTEGER,
    });
    Foods_micro.associate = models => {
      Foods_micro.hasOne(models.Foods,{
          foreignKey : 'id_foods',
          as : 'foods'
      });
      Foods_micro.hasOne(models.Microorganism,{
        foreignKey : 'id_micro',
        as : 'microorganism'
    });
    }
  return Foods_micro;
  }