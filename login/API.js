// server.js
const express = require('express');
const body_parser = require('body-parser');
const {hash_password,compare_passwords} = require('./hash.js')



const {create_item, update_password, read_password, read_all_items, delete_password} = require('./crud');

const Router = express.Router();

// Create a new user
Router.post('/users', (req, res) => {
  console.log(req.body)
  const user_name = req.body['user_name']
  const password = req.body['password_hash'];
  const password_hash = hash_password(password)
  console.log(user_name, password_hash)
  create_item(user_name, password_hash, (err, data) => {
    if(err) {
        res.status(500).send(err.message)
    } else {
        res.status(200).send('Item is added. ID:' + data.id)
    }
  })
});

// Read all users
Router.get('/users', (req, res) => {
    read_all_items((err, rows) => {
        if (err) {
            res.status(500).send(err.message)
        } else {
            res.status(200).json(rows)
        }
    })
});

// Read a single user by ID
Router.get('/users/:user_name', (req, res) => {
  const { user_name } = req.params;
  read_password(user_name, (err, rows) => {
    if (err) {
        res.status(500).send(err.message)
    } else {
        res.status(200).json(rows)
    }
  })
});

// Update a user by ID
Router.put('/users/:id', (req, res) => {
  const { user_name, password } = req.body;
  const password_hash = hash_password(password_hash)
  update_password(user_name, password_hash, user_name, (err) => {
    if (err) {
        res.status(500).send(err.message)
    } else {
        res.status(200).send("Updated item")
    }
  })
});

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

module.exports = router;