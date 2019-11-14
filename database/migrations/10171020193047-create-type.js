module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('types', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
          },
          type: {
            allowNull: true,
            type: DataTypes.STRING,
          },
          control_measure: {
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
    return queryInterface.dropTable('types');
  }
};