'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";')
      .then(() => { 
        return queryInterface.createTable('Users', {
                  id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.literal('gen_random_uuid()'),
                    allowNull: false
                  },
                  username: {
                    type: Sequelize.STRING
                  },
                  password: {
                    type: Sequelize.STRING
                  },
                  firstname: {
                    type: Sequelize.STRING
                  },
                  lastname: {
                    type: Sequelize.STRING
                  },
                  phone: {
                    type: Sequelize.STRING
                  },
                  email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                  },
                  address: {
                    type: Sequelize.TEXT
                  },
                  authority: {
                    type: Sequelize.INTEGER
                  },
                  createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                  },
                  updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                  }
                });
              })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};