const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
      id_facebook: DataTypes.STRING,
      id_google: DataTypes.STRING,
      url_image: DataTypes.STRING
    });
    
    User.addHook('beforeSave', async user => {
      if(user.password) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    });

    return User;
  }