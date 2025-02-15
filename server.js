const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const  db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'admin1234',
    database : 'smart-brain'
  }
});

// db.select('*').from('users').then(data => {
// 	console.log(data);
// });
 
const app = express();

app.use(bodyParser.json());
app.use(cors());
const database = {
	users: [
		{
			id: '123',
			name: 'John',
			password: 'cookies',
			email: 'john@gmail.com',
			entries: 0,
			joined: new Date()
		}, 
		{
			id: '124',
			name: 'Sally',
			password: 'bananas',
			email: 'sally@gmail.com',
			entries: 0,
			joined: new Date()
		}
	],
	login: [
		{
			id: '',
			hash: '',
			email: 'john@gmail.com'
		}
	]
}

app.get('/', (req, res) => { res.send(database.users); });
app.post('/signin', signin.handleSignIn(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApliCall(req, res) });

app.listen(3000, ()=> {
	console.log('App is running on port 3000');
})

/*
/ --> res =this is working
/signin --> post = success/fail
/register --> post = user
/profile/:userId --> Get = user
/image --> put --> user

*/
