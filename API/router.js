//Librarys
const express = require('express');

//Imports
const {create_item, read_todo, update_todo, delete_todo, read_all_items, delete_all_null_todo, delete_all_todo_from_user } = require('./crud.js');
 
const Router = express.Router();


Router.post('/create_todo', (req, res) => {
    const {user_name, todo, state} = req.body
    create_item(user_name, todo, state, function(err) {
        if (err) {
            console.error(err)
            res.status(400).send("Error at the creation of the todo")
        } else {
            res.status(200).send("Added correctly the todo")
        }
    })
})

function delete_all_users_todo(req) {

}



Router.delete('/delete_row', (req, res) => {
    const {id} = req.body
    delete_todo(id, function (err) {
        if (err) {
            console.error(err)
            res.status(400).send("Problem at the delete of the todo")
        } else {
            res.status(200).send("Deleted correctly")
        }
    })
})

Router.post('/update_row', (req, res) => {
    console.log(req.body)
    const {id, user, todo, state} = req.body
    update_todo(id, user, todo, state, function(err) {

    })
    res.end()
})

function update_row(req) {

}

Router.post('/delete_all_users_todo', (req, res) => {
    const {user_name} = req.body
    delete_all_todo_from_user(user_name, function (err) {
        if (err) {
            console.error(err)
            res.status(400).send("Problem at the delete of the todo")
        } else {
            res.status(200).send("Deleted correctly")
        }
    })
})

module.exports = Router;