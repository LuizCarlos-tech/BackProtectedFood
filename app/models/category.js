module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
      name: DataTypes.STRING,
      descripithion: DataTypes.STRING,
    });
    
    Category.associate = models => {
      Category.hasMany(models.Foods,{
          foreignKey : 'id_category',
          as : 'foods'
      });
      Category.hasMany(models.Microorganism,{
        foreignKey : 'id_category',
        as : 'microorganisms'
    });
    }
  return Category;
  }