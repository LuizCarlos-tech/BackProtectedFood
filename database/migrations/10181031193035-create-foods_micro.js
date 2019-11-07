module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('foods_micro', {
          id_micro: {
            allowNull: true,
            type: DataTypes.INTEGER,
		        references: {
          	  model: 'microorganisms',
         	    key: 'id'
          }
        },
	  id_foods: {
            allowNull: true,
            type: DataTypes.INTEGER,
		references: {
          model: 'foods',
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
    return queryInterface.dropTable('foods_micro');
  }
};