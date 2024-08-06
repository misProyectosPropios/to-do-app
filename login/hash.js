const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config() //process.env.variable_name
 
const saltRounds = 10

function hash_password(password_to_hash) {
    let res = bcrypt.hashSync(password_to_hash, saltRounds)
    return res
}

function compare_passwords(password, hash) {
    let res = bcrypt.compareSync(password, hash)
    return res
}

module.exports = {
    hash_password,
    compare_passwords
}