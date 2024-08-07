//LIbrarys
const express = require('express')
const session = require('express-session');
const store = new session.MemoryStore()
const body_parser = require('body-parser');
const dotenv = require('dotenv').config()
const app = express()

//Routes for middleware
const route_get_todo = require('./API/get_todos.js')
const route_API = require('./API/router.js')
const route_login = require('./login/login.js')
const route_register = require('./login/register.js')
const route_unlogin = require('./login/unlogin.js')
const route_change_password = require('./login/change_password.js')

const port = process.env.PORT
const direction = process.env.DIRECTION

//Middleware
app.use(session({
	secret: process.env.SECRET,
	resave: true,
	saveUninitialized: true,
	store
}));
app.use(express.json())
app.use(body_parser.urlencoded({ extended: false })) //Para poder acceder a los parametros con POST, por medio del req.body[nombre_del-parametro]
app.use(express.static('public')) //Para enviar el archivo js.js, el css y las imagines

app.get('/favicon.ico', (req, res) => res.status(204));

app.use(function middleware(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip + " - " + req.url)
    console.log()
    next()
}) 

app.use(function(req, res, next) {
	console.log("URL: " + req.url)
	next()
  })

//For the login, register, unlogin and change password
app.use('/login', route_login)
app.use('/register', route_register)
app.use('/unlogin', route_unlogin)
app.use('/change_password', route_change_password)

app.use('/api', route_API)
app.use('/api', route_get_todo)

app.use((req, res, next) => {
	console.log("hola mundo")
	console.log("URL: " + req.url)
	console.log(req.session)
	if (req.session.loggedin) {
		console.log("Authorized user. Go to your location")
		next()
	} else {
		console.log("Unauthorized. Login or register first")
		res.status(401).send('Unauthorized. Login or register first')
	}
  })

app.get('/', (req, res) => {
	console.log("URL: " + req.url)
    res.redirect('/home')
    console.log("It was called the path: /")
	res.end()
})

//If the ejecutation came down here, then it's logged	
app.get('/home', function(req, res) {
	res.redirect('/home/' + req.session.username)
});

app.get('/home/:username', function(req, res) {
	if (req.params['username'] === req.session.username) {
		console.log("URL: " + req.url)
		res.sendFile(direction + "/views/to-do.html")
	} else {
		res.redirect('/home/' + req.session.username)
	}
	
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

