//Librarys
const express = require('express');
const Router = express.Router();

Router.post('/', (req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            console.error(err)
        }
    });
    
    res.send("logout success!");
})

module.exports = Router;