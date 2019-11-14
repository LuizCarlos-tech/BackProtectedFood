
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('microorganisms', {
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
          description: {
            allowNull: true,
            type: DataTypes.TEXT,
          },
          url_image: {
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
    return queryInterface.dropTable('microorganisms');
  }
};