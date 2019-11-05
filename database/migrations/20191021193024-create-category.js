module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('category', {
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
          descripition: {
            allowNull: true,
            type: DataTypes.TEXT,
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
    return queryInterface.dropTable('category');
  }
};