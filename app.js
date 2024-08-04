const bcrypt = require('bcrypt');
const express = require('express')

const app = express()

//Middleware
app.use(body_parser.urlencoded({ extended: false })) //Para poder acceder a los parametros con POST, por medio del req.body[nombre_del-parametro]

app.use(express.static('public')) //Para enviar el archivo js.js, el css y las imagines

app.use(function middleware(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip + " - " + req.url)
    console.log()
    next()
}) 

app.get('/', (req, res) => {
    console.log("It was called the path: /")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

