
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('symptoms', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
          },
        description: {
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
    return queryInterface.dropTable('symptoms');
  }
};