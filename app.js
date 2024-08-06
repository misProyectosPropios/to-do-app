const express = require('express')
const route_login = require('./login/login.js')
const route_register = require('./login/register.js')
const session = require('express-session');
const body_parser = require('body-parser');
const app = express()
const port = 3000
//Middleware


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json())
app.use(body_parser.urlencoded({ extended: false })) //Para poder acceder a los parametros con POST, por medio del req.body[nombre_del-parametro]
app.use('/login', route_login)
app.use('/register', route_register)

app.use(express.static('public')) //Para enviar el archivo js.js, el css y las imagines

app.use(function middleware(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip + " - " + req.url)
    console.log()
    next()
}) 

app.get('/', (req, res) => {
    res.redirect('/login')
    console.log("It was called the path: /")
})

app.get('/home', function(req, res) {
	// If the user is loggedin
	if (req.session.loggedin) {
		// Output username
		res.send('Welcome back, ' + req.session.username + '!');
	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
	res.end();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

