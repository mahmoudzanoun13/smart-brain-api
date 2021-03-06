import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcrypt-nodejs';
import {handleRegister} from './controllers/register.js';
import {handleSignin} from './controllers/signin.js';
import {handleProfileGet} from './controllers/profile.js';
import {handleImage, handleApiCall} from './controllers/image.js';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const db = knex({
  client: 'pg',
  connection: {
    /*ssl: {
      rejectUnauthorized: false
    }*/
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();

app.use(cors())

app.use(express.json());

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