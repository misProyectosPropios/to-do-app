const express = require('express');
const body_parser = require('body-parser');
const {hash_password} = require('./hash.js')

const {create_item} = require('./crud.js');

const Router = express.Router();

const path = "/register"

// Creates a new user, if it doesn't exists already
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

  Router.get('/', (req, res) => {
    console.log("Se entro en " + path )
    return res.sendFile(process.env.DIRECTION + "/views/login.html")
  })

  module.exports = Router