module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('diseases_symptoms', {
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    id_disease: {
            allowNull: true,
            type: DataTypes.INTEGER,
		        references: {
          	  model: 'diseases',
         	    key: 'id'
          }
        },
	  id_symptom: {
            allowNull: true,
            type: DataTypes.INTEGER,
		      references: {
          model: 'symptoms',
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
    return queryInterface.dropTable('diseases_symptoms');
  }
};