const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const groupMembers = sequelize.define('groupMembers', {
    groupId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: Sequelize.INTEGER,

    

})

module.exports = groupMembers