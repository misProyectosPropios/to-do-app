// server.js
const express = require('express');
const body_parser = require('body-parser');
const {compare_passwords} = require('./hash.js')

const {read_password, read_all_items} = require('./crud.js');

const Router = express.Router();


// Read a single user by ID
//If the user_name exists and the password is correct, returns true
//If the user_name don't exists or the password is incorrect, returns false
Router.post('/', (req, res) => {
  const user_name = req.body['user_name']
  const password  = req.body['password_hash'];
  read_password(user_name, function(err, row) {
    if (err) {
      res.status(500).send("AN ERROR OCURRED")
    } else {
      let is_correct_password = compare_passwords(password, row['password_hash'])
      if (is_correct_password) {
        res.status(200).status("Welcome back" + user_name + "!")
      } else {
        res.status(401).status("User or password incorrect")
      }
      console.log(row['password_hash'])
    }
  })
  res.end()
});

module.exports = Router;