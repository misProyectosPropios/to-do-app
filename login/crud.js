const database = require("./database")

/* Creates an item in the users table on sqlite3  
 * problem create_item (user_name: text, password_hash: text, callback: function) {
 *     pre-condition: user_name must not exists already in the table users
 *     pre-condition: password_hash must be a password that has already been hashed
 *     pre-condition: callback is a function which takes one argument: err
 * 
 *     post-condition: the parameter err returns err if an error ocurred, otherwise, returns null
 *     post-condition: the parameter row returns the rows if there's a row to return, otherwise returns null
 * }
 */
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

function read_password (user, callback) {
    const sql= 'UPDATE users SET user_name=?, password_hash=? WHERE user_name=?'
    database.all(sql, [user, new_password_hash, user], function (err) {
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
    let res 
    database.get(sql, function (err, row) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, row)
        }
        
    })
    console.log("El run es: ")
    console.log(res)
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