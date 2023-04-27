'use strict';

const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { check, validationResult } = require('express-validator');


const authenticateUser = (req, res, next) => {
  next();
};

// GET /api/users route
router.get('/api/users', authenticateUser, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.currentUser.id
      },
      attributes: { exclude: ['password'] }
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the user data' });
  }
});

// POST /api/users route
router.post('/api/users', [
  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),
  check('emailAddress').isEmail().withMessage('Email address is not valid'),
  check('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newUser = await User.create(req.body);
    res.setHeader('Location', '/');
    res.status(201).end();
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the user' });
  }
});

module.exports = router;
