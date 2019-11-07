module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('categories', {
      name: DataTypes.STRING,
      descripition: DataTypes.STRING,
    });
    
    Category.associate = models => {
      Category.hasMany(models.foods,{
          foreignKey : 'id_category',
          as : 'foods'
      });
      Category.hasMany(models.microorganisms,{
        foreignKey : 'id_category',
        as : 'microorganism'
    });
    }
  return Category;
  }