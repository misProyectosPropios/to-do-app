// server.js
const express = require('express');
const body_parser = require('body-parser');
const {create_item, update_password, read_password, read_all_items, delete_password} = require('./crud');

const app = express();
const port = 3000;

//Middleware
app.use(express.json())

app.use(body_parser.urlencoded({ extended: false })) //Para poder acceder a los parametros con POST, por medio del req.body[nombre_del-parametro]

// Create a new user
app.post('/users', (req, res) => {
  console.log(req.body)
  const user_name = req.body['user_name']

  const password_hash = req.body['password_hash'];

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
app.get('/users', (req, res) => {
    read_all_items((err, rows) => {
        if (err) {
            res.status(500).send(err.message)
        } else {
            res.status(200).json(rows)
        }
    })
});

// Read a single user by ID
app.get('/users/:user_name', (req, res) => {
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
app.put('/users/:id', (req, res) => {
  const { user_name, password_hash } = req.body;
  update_password(user_name, password_hash, user_name, (err) => {
    if (err) {
        res.status(500).send(err.message)
    } else {
        res.status(200).send("Updated item")
    }
  })
});

// Delete a user by ID
app.delete('/users/:user_name', (req, res) => {
  const { user_name } = req.params;
  delete_password(user_name, (err) => {
    if (err) {
        res.status(500).send(err.message)
    } else {
        res.status(200).send("DELETED")
    }
  })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});