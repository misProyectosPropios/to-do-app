const express = require('express');

//Imports
const {create_item, read_todo, update_todo, delete_todo, read_all_items, delete_all_null_todo, delete_all_todo_from_user } = require('./crud.js');
 
const Router = express.Router();

//Returns all the todos from a given user
// get_todos should have a user_name on the req.body
// Returns an json with all the todos from the given user
Router.post('/get_todos', async (req, res) => {
    let json = await get_todos(req, res)
    console.log("el type es: " + typeof json)

    console.log(json)
    res.json(json)
})

async function get_todos(user_name, res) {
    return new Promise(function(resolve, reject) {
        read_todo(user_name, function (err, data) {
            if (err !== null) reject(err);
            else {
                let json = {};
                let index = 0;
                data.forEach(object => {
                    json[index] = object;
                    index++;
                });
                //console.log(json)
                resolve(json);
            }
        })
    })
}
module.exports = get_todos;