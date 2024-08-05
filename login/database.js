const sqlite3 = require('sqlite3')
const db_name = 'my_database.db'

let db = new sqlite3.Database(db_name, (err) => {
    if (err) {
        console.log(err.message)
    } else {
        console.log("Connected to database")
        db.run('CREATE TABLE IF NOT EXISTS users(user_name TEXT PRIMARY KEY, password_hash TEXT)', (err) => {
            if (err) {
                console.error(err.message)
            } else {
                console.log("CREATED DATABASE")
            }
        })
    }
})

module.exports = db