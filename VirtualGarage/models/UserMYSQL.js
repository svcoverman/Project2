const Sequelize = require('sequelize');
const db = require('../config/database');

const mysqlUser = db.define('mysqlUser', {
  title: {
    type: Sequelize.STRING
  },
  technologies: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  budget: {
    type: Sequelize.STRING
  },
  contact_email: {
    type: Sequelize.STRING
  }
})

module.exports = mysqlUser;