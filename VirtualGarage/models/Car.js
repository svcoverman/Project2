const Sequelize = require('sequelize');
const db = require('../config/database');

const Car = db.define('car', {
  make: {
    type: Sequelize.STRING
  },
  model: {
    type: Sequelize.STRING
  },
  year: {
    type: Sequelize.STRING
  },
  mileage: {
    type: Sequelize.STRING
  },
  VIN: {
    type: Sequelize.STRING
  },
  contact_email: {
    type: Sequelize.STRING
  }
})

module.exports = Car;