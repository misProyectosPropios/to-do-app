const express = require('express');
const body_parser = require('body-parser');
const {hash_password} = require('./hash.js')

const {update_password} = require('./crud.js');

const Router = express.Router();

// Update a user by ID
Router.put('/users/:id', (req, res) => {
    const { user_name, password } = req.body;
    const password_hash = hash_password(password_hash)
    update_password(user_name, password_hash, user_name, (err) => {
      if (err) {
          res.status(500).send(err.message)
      } else {
          res.status(200).redirect('/login')
      }
    })
  });