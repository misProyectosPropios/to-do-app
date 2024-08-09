const database = require("./database")

/* Creates an item in the users table on sqlite3  
 * problem create_item (user_name: text, todo_text: text, state: number, callback: function) {
 *     pre-condition: user_name must not exists already in the table users
 *     pre-condition: password_hash must be a password that has already been hashed
 *     pre-condition: callback is a function which takes one argument: err
 * 
 *     post-condition: the parameter err returns err if an error ocurred, otherwise, returns null
 *     post-condition: the parameter row returns the rows if there's a row to return, otherwise returns null
 * }
 */
const create_item = (user_name, todo_text, state, callback) => {
    const sql= 'INSERT INTO to_do (username, todo, state) VALUES (?, ?, ?)'
    database.run(sql, [user_name, todo_text, state], function(err) {
        callback(err, this.lastID)
    })
}

/* 
 * Deletes the row that has the user
 * problem delete_password (user: text, callback: function(err)) {
 *  pre-condition: 
 *  pre-condition
 * 
 *  post-condition:
 * }
 */

const delete_todo = (id, callback) => {
    const sql= 'DELETE FROM to_do WHERE id=?'
    database.run(sql,  id, function (err) {
        callback(err, {id: this.lastID})
    })
}


const delete_all_todo_from_user = (user, callback) => {
    const sql= 'DELETE FROM to_do WHERE username=?'
    database.run(sql,  user, function (err) {
        callback(err, {id: this.lastID})
    })
}

/*
 * Given a user, it returns on the callback the password associated with the user_name or the error that occured
 * problem read_password(user: text, callback: function (err, password)) {
 *  pre-condition: 
 *  pre-condition
 * 
 *  post-condition:
 *  }
 */
function read_todo (user, callback) {
    const sql= 'SELECT * FROM to_do WHERE username=?'
    let res 
    database.all(sql, user, function (err, row) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, row)
        }
    })
}


/*
 * Given a user_name, changes the old password to the new_password_hash
 * problem update_password(user: text, new_password_hash: text, callback: function(err)) {
 *  pre-condition: 
 *  pre-condition
 * 
 *  post-condition:
 * }
 */
const update_todo= (id, user, todo, state, callback) => {
    const sql= 'UPDATE to_do SET username=?, todo=?, state=? WHERE id=?'
    database.all(sql, [user, todo, state, id], function (err) {
        callback(err, {id: this.lastID})
    })
}


/*
 * problem read_all_items(callback: function(err, row)) {
 *  pre-condition: 
 *  pre-condition
 * 
 *  post-condition:
 * }
 */
const read_all_items = (callback) => {
    const sql= 'SELECT * FROM to_do'
    let res 
    database.get(sql, function (err, row) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, row)
        }
    })
}



/*
 * problem delete_all_null_users(callback: function(err)) {
 *  pre-condition: 
 *  pre-condition
 * 
 *  post-condition:
 * }
 */
const delete_all_null_todo = (callback) => {
    const sql= 'DELETE FROM to_do WHERE user_name=NULL'
    database.run(sql, [], function (err) {
        callback(err, {id: this.lastID})
    })
}

//Exports the functions
module.exports = {
    create_item,
    read_todo,
    update_todo,
    delete_todo,
    read_all_items,
    delete_all_null_todo,
    delete_all_todo_from_user
}