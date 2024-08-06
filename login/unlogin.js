//Librarys
const express = require('express');
const Router = express.Router();

Router.post('/', (req, res) => {
    req.session.destroy(function(err) {
        console.log(err)
    });
    
    res.send("logout success!");
})

module.exports = Router;