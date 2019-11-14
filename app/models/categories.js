module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('categories', {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    });
    
    Category.associate = models => {
      Category.hasMany(models.foods,{
          foreignKey : 'id_category',
          as : 'foods'
      });
      Category.hasMany(models.microorganisms,{
        foreignKey : 'id_category',
        as : 'microorganisms'
    });
    }
  return Category;
  }