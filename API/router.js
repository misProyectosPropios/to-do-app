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



Router.post('/delete_row', (req, res) => {
    const {id} = req.body
    if (delete_row(id)) {
        res.status(400).send("Problem at the delete of the todo")
    } else {
        res.status(200).send("Deleted correctly")
    }
})

function delete_row(id) {
    delele_todo(id, function (err) {
        if (err) {
            console.error(err)
            return err
        }
    })
    return undefined
}

Router.post('/update_row', (req, res) => {
    res.end()
})

function update_row(req) {

}

Router.post('/delete_all_users_todo', (req, res) => {
    res.end()
})

function delete_all_users_todo(req) {

}

module.exports = Router;