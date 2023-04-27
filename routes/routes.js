'use strict';

const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { Sequelize } = require('sequelize');
const auth = require('basic-auth');
const bcrypt = require('bcrypt');

const authenticateUser = async (req, res, next) => {
  const credentials = auth(req);

  if (credentials) {
    const user = await User.findOne({
      where: {
        emailAddress: credentials.name
      }
    });

    if (user && bcrypt.compareSync(credentials.pass, user.password)) {
      req.currentUser = user;
      next();
    } else {
      res.status(401).json({ message: 'Access Denied' });
    }
  } else {
    res.status(401).json({ message: 'Authentication required' });
  }
};

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

router.post('/api/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.setHeader('Location', '/');
    res.status(201).end();
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      res.status(400).json({ errors: error.errors.map(err => err.message) });
    } else {
      res.status(500).json({ message: 'An error occurred while creating the user' });
    }
  }
});

module.exports = router;
