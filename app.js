//LIbrarys
const express = require('express')
const session = require('express-session');
const store = new session.MemoryStore()
const body_parser = require('body-parser');
const dotenv = require('dotenv').config()
const app = express()



//Routes for middleware
const route_login = require('./login/login.js')
const route_register = require('./login/register.js')

const port = process.env.PORT
const direction = process.env.DIRECTION

var newError = new Error('my error message')
//Middleware
app.use(session({
	secret: process.env.SECRET,
	resave: true,
	saveUninitialized: true,
	store
}));
app.use(express.json())
app.use(body_parser.urlencoded({ extended: false })) //Para poder acceder a los parametros con POST, por medio del req.body[nombre_del-parametro]

app.get('/favicon.ico', (req, res) => res.status(204));

app.use(function middleware(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip + " - " + req.url)
    console.log()
    next()
}) 

app.use('/login', route_login)
app.use('/register', route_register)
app.use(express.static('public')) //Para enviar el archivo js.js, el css y las imagines


app.use((req, res, next) => {
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
    res.redirect('/home')
    console.log("It was called the path: /")
	res.end()
})

app.get('/home', function(req, res) {
	console.log("Estas en /home")
	res.sendFile(direction + "/views/to-do.html")
	//res.end();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

