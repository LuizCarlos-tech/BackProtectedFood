module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('foods', {
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
          control_measure: {
            allowNull: true,
            type: DataTypes.STRING,
          },
          id_type: {
            allowNull: true,
            type: DataTypes.INTEGER,
		      references: {
          	 model: 'types',
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
    return queryInterface.dropTable('foods');
  }
};