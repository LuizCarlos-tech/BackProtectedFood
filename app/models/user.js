module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
      name: DataTypes.STRING,
      url_image: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
      id_google: DataTypes.STRING,
      id_facebook: DataTypes.STRING,
      id_instagram: DataTypes.STRING,
    });
  return User;
  }