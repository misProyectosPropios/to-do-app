const database = require("./database")

const create_item = (user_name, password_hash, callback) => {
    const sql= 'INSERT INTO users (user_name, password_hash) VALUES (?, ?)'
    database.run(sql, [user_name, password_hash], function(err) {
        callback(err, {id: this.lastID})
    })
}

const delete_password = (user, callback) => {
    const sql= 'DELETE FROM users WHERE user_name=?'
    database.run(sql,  user, function (err) {
        callback(err, {id: this.lastID})
    })
}

const read_password = (user, callback) => {
    const sql= 'SELECT * FROM users WHERE user_name=?'
    database.all(sql, user, function (err) {
        callback(err, {id: this.lastID})
    })
}

const update_password = (user, new_password_hash, callback) => {
    const sql= 'UPDATE users SET user_name=?, password_hash=? WHERE user_name=?'
    database.all(sql, [user, new_password_hash, user], function (err) {
        callback(err, {id: this.lastID})
    })
}

const read_all_items = (callback) => {
    const sql= 'SELECT * FROM users'
    database.run(sql, [], function (err) {
        callback(err, {id: this.lastID})
    })
}

const delete_all_null_users = (callback) => {
    const sql= 'DELETE FROM users WHERE user_name=NULL'
    database.run(sql, [], function (err) {
        callback(err, {id: this.lastID})
    })
}

module.exports = {
    create_item,
    read_password,
    update_password,
    delete_password,
    read_all_items,
    delete_all_null_users
}