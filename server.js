import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcrypt-nodejs';
import {handleRegister} from './controllers/register.js';
import {handleSignin} from './controllers/signin.js';
import {handleProfileGet} from './controllers/profile.js';
import {handleImage, handleApiCall} from './controllers/image.js';

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: '01284071645.mano.55.z',
    database: 'smart-brain'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.json('it is working')})
app.post('/register', handleRegister(db, bcrypt))
app.post('/signin', (req, res) => {handleSignin(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { handleApiCall(req, res,) })

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});

/* 
  / --> res = this is working
  /signin --> post = success/fail
  /register --> post = user
  /profile/:userId --> get = user
  /image --> put --> user
*/

/*
  bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/