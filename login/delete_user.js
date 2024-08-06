const express = require('express');
const {delete_password} = require('./crud.js');

const Router = express.Router();

// Delete a user by ID
Router.delete('/users/:user_name', (req, res) => {
    const { user_name } = req.params;
    delete_password(user_name, (err) => {
      if (err) {
          res.status(500).send(err.message)
      } else {
          res.status(200).send("DELETED")
      }
    })
  });