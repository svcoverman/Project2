const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Car = require('../models/Car');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Get gig list
router.get('/', (req, res) => 
  Car.findAll()
    .then(cars => res.render('cars', {
        cars
      }))
    .catch(err => console.log(err)));

// Display add gig form
router.get('/add', (req, res) => res.render('add'));

// Add a gig
router.post('/add', (req, res) => {
  let { make, model, year, mileage, contact_email } = req.body;
  let errors = [];

  // Validate Fields
  if(!make) {
    errors.push({ text: 'Please add a title' });
  }
  if(!model) {
    errors.push({ text: 'Please add some technologies' });
  }
  if(!year) {
    errors.push({ text: 'Please add a description' });
  }
  if(!contact_email) {
    errors.push({ text: 'Please add a contact email' });
  }

  // Check for errors
  if(errors.length > 0) {
    res.render('add', {
      errors,
      make, 
      model, 
      year, 
      mileage, 
      contact_email
    });
  } else {
    if(!mileage) {
      mileage = 'Unknown';
    } else {
      mileage = `${mileage}`;
    }

    // Insert into table
    Car.create({
      make, 
      model, 
      year, 
      mileage, 
      contact_email
    })
      .then(car => res.redirect('/cars'))
      .catch(err => console.log(err));
  }
});

// Search for gigs
router.get('/search', (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  Car.findAll({
    where: {
      [Op.or]: [{model: { [Op.like]: '%' + term + '%' }}, 
                {make:  { [Op.like]: '%' + term + '%' }}, 
                {year:  { [Op.like]: '%' + term + '%' }}, 
                {mileage:  { [Op.like]: '%' + term + '%' }}]
    }
  })
    .then(cars => res.render('cars', { cars }))
    .catch(err => console.log(err));
});

module.exports = router;