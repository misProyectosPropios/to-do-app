// login.js
const express = require('express');
const body_parser = require('body-parser');
const {compare_passwords} = require('./hash.js')
const dotenv = require('dotenv').config()

const {read_password, read_all_items} = require('./crud.js');

const Router = express.Router();

const path = "/login"

// Read a single user by ID
//If the user_name exists and the password is correct, returns true
//If the user_name don't exists or the password is incorrect, returns false
Router.post('/', (req, res) => {
  console.log("Se llamo a post /login")
  const user_name = req.body['username']
  const password  = req.body['password'];
  read_password(user_name, function(err, row) {
    if (err) {
      res.status(500).send("AN ERROR OCURRED")
    } else {
      if (req.session) {
        let is_correct_password = compare_passwords(password, row['password_hash'])
        if (is_correct_password) {
          req.session.loggedin = true;
			  	req.session.username = user_name;
          res.status(200).status("Welcome back" + user_name + "!")
        } else {
          res.status(401).status("User or password incorrect")
        }
      }
      console.log(row['password_hash'])
    }
  })
  res.end()
});

Router.get('/', (req, res) => {
	console.log("Se entro en " + path )
  
	return res.sendFile(process.env.DIRECTION + "/views/login.html")
})
module.exports = Router;