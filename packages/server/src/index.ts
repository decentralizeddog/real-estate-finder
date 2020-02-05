import { Express } from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/database';
import cors from 'cors';
import {
  routerAuth,
  routerRegister,
  routerApartment,
  routerUser,
} from './routes/api';
const express = require('express');

const app: Express = express();
app.use(cors());

// Connect to DB
connectDB();

app.set('port', process.env.PORT || 5000);
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

// @route   GET /
// @desc      
// @access  Public
app.get('/', (req, res) => {
  res.send('Running');
});

app.use('/api/auth', routerAuth);
app.use('/api/register', routerRegister);
app.use('/api/apartment', routerApartment);
app.use('/api/user', routerUser);

const port = app.get('port');
const server = app.listen(port, () => {
  console.log(`Server up and running on port ${port}`)
});
