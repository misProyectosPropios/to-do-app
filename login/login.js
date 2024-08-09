//Librarys
const express = require('express');

//Imports
const {compare_passwords} = require('./hash.js')
const dotenv = require('dotenv').config()
const {read_password} = require('./crud.js');

const Router = express.Router();

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
      console.log("No hubo ningún error")
      if (req.session) {
        console.log("Comparando las contraseñas")
        console.log(row["password_hash"])
        console.log(password)
        let is_correct_password = compare_passwords(password, row['password_hash'])
        if (is_correct_password) {
          req.session.loggedin = true;
			  	req.session.username = user_name;
          console.log("Authorized")
          console.log(req.session)
          req.session.save(function(err) {
            if (err) {
              console.error(err)
            } 
            
          })
          res.status(200).status("Welcome back" + user_name + "!")
        } else {
          console.log("Unauthorized")
          res.status(401).status("User or password incorrect")
        }
      }
      console.log(row['password_hash'])
    }
  })
  res.end()
});

Router.get('/', (req, res) => {
	return res.sendFile(process.env.DIRECTION + "/views/login.html")
})


module.exports = Router;