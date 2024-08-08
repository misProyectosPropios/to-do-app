//LIbrarys
const express = require('express')
const session = require('express-session');
const store = new session.MemoryStore()
const body_parser = require('body-parser');
const dotenv = require('dotenv').config()
const app = express()


//Routes for middleware
const get_todos= require('./API/get_todos.js')
const route_API = require('./API/router.js')
const route_login = require('./login/login.js')
const route_register = require('./login/register.js')
const route_unlogin = require('./login/unlogin.js')
const route_change_password = require('./login/change_password.js');
const { compareSync } = require('bcrypt');

const port = process.env.PORT
const direction = process.env.DIRECTION
const html_todo_1st = process.env.TODO_HTML_1st
const html_todo_2nd = process.env.TODO_HTML_2nd

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
//app.use('/api', route_get_todo)

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

app.get('/home/:username', async function(req, res) {
	if (req.params['username'] === req.session.username) {
		console.log("URL: " + req.url)
		todos_json = await get_todos(req.params['username'], res)
		//console.log(todos_json)
		res.send(html_todo_1st + create_inside_div(todos_json) + html_todo_2nd)
		//res.sendFile(direction + "/views/to-do.html")
	} else {
		res.redirect('/home/' + req.session.username)
	}
	
});

function create_inside_div(json) {
	let res = ""
	let keys_list = Object.keys(json)
	let id_list = []
	keys_list.forEach((key) => {
		id_list.push([])
		id_list[id_list.length - 1].push(json[key].id)
		id_list[id_list.length - 1].push(key)
	})
	id_list.sort((a,b) => {
		return a[0] - b[0]
	})
	for(let i = 0; i < id_list.length; i++) {
		res += "<div class='row'>"
		res += "<input type='checkbox'>"
		res += "<textarea class='textarea' rows=1  onchange=updateDatabase(this.id) id=\"" + id_list[i][0] +"\">"
		//res += "<textarea name='textarea' class='textarea' rows=1  id=\"" + id_list[i][0] +"\">"
		res += json[id_list[i][1]].todo
		res += "</textarea>"
		res += "<button class='close' onClick='delete_todo(this)'/>"
		res += "</div>"
	}
	return res
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

