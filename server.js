// Requirements
const express = require('express');
require('dotenv').config();


// Port
const PORT = 3000;

const app = express();

const mongoose = require('mongoose');

// Mongoose Connect
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
// Function to take 2 arguments: 1. Reference (Error). In the case of error, object that comes back is logged as error. 
// 2. Log as error /in console w/ red text.
db.on('error', () => console.error(error));
db.once('open', () => console.log('Connected to db'));

// Middleware
// So we can read the url that comes in
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Grab routes file
const apiRouter = require('./routes/apiroutes.js');
app.use('/api', apiRouter);

// Listener
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});