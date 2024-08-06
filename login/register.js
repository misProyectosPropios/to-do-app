const express = require('express');
const body_parser = require('body-parser');
const {hash_password} = require('./hash.js')

const {create_item} = require('./crud.js');

const Router = express.Router();

// Create a new user
Router.post('/', (req, res) => {
    console.log(req.body)
    const user_name = req.body['user_name']
    const password = req.body['password_hash'];
    const password_hash = hash_password(password)
    create_item(user_name, password_hash, (err, data) => {
      if(err) {
          res.status(500).send(err.message)
      } else {
            res.status(200).redirect('/login')
      }
    })
  });

  module.exports = Router