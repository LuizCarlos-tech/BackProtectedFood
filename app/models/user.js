module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      IdFacebook: DataTypes.STRING,
      IdGoogle: DataTypes.STRING,
      IdInstagram: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    });
  
    return User;
  }