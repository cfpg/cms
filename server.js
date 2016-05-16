'use strict';

const express = require('express');

// start mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://splsh:culob310@ds023442.mlab.com:23442/splash');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// Constants
const PORT = 8080;

// App
const app = express();
app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);