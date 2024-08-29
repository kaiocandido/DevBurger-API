/* 
This code is a migration that creates a users table in the database with specific columns to store information about users. The table includes a 
UUID as the primary key, a name, a unique email, a password hash, a flag to indicate whether the user is an administrator, and timestamps for when 
the record was created and updated. The down method reverses the migration by removing the users table.
*/
'use strict'
const { UUIDV4 } = require('sequelize')
const { defaultValueSchemable } = require('sequelize/lib/utils')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password_hash: { type: Sequelize.STRING, allowNull: false },
      admin: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users')
  },
}
