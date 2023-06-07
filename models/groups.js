const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const groups = sequelize.define('groups', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    createdBy: Sequelize.INTEGER

})

module.exports = groups