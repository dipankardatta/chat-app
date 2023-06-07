const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const groupMessage = sequelize.define('groupMessage', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: Sequelize.INTEGER,
    name: {
        type: Sequelize.STRING,
        allowNull: false
      },
    message: {
        type: Sequelize.STRING,
        allowNull: false},
    

})

module.exports = groupMessage