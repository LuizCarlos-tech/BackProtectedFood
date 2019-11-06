
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('microorganism', {
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
          id_category: {
            allowNull: true,
            type: DataTypes.INTEGER,
		      references: {
          	 model: 'categories',
         	   key: 'id'
          }
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
    return queryInterface.dropTable('microorganism');
  }
};