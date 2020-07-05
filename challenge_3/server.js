var crypto = require('crypto');
var mysql = require('mysql');

const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded());
app.use(express.static('public'));

app.post('/checkout', (req, res) => {
  console.log(req.body);
  res.send('ok')
});

// connection.query(insert...)

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))



// Database setup

// Connection
var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'formdata'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});



// hashing a password

function makeSalt(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function hashPassword(password) {
  var salt = makeSalt(10);
  var toHash = password + salt;
  // using sha265
  const hash = crypto.createHash('sha256');
  return hash.update(toHash);
}
