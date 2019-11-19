module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Users', {
          id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
          },
          name: {
            allowNull: true,
            type: DataTypes.STRING,
          },
          url_image: {
            allowNull: true,
            type: DataTypes.STRING,
          },
          admin: {
            allowNull: true,
            type: DataTypes.BOOLEAN,
          },
          password: {
            allowNull: true,
            type: DataTypes.STRING,
          },
          email: {
            allowNull: true,
            type: DataTypes.STRING,
          },
          id_google: {
            allowNull: true,
            type: DataTypes.STRING,
          },
          id_facebook: {
            allowNull: true,
            type: DataTypes.STRING,
          },
          id_instagram:{
            allowNull: true,
            type: DataTypes.STRING,
          },
          createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
          },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
