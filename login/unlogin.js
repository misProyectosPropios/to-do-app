const express = require('express');
const body_parser = require('body-parser');
//const {compare_passwords} = require('./hash.js')


const Router = express.Router();

Router.post('/', (req, res) => {
    console.log("URL: " + req.url)
    req.session.destroy();
    res.send("logout success!");
})

module.exports = Router;