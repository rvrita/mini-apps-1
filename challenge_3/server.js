var crypto = require('crypto');
var mysql = require('mysql');

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static('public'));
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

app.post('/checkout', (req, res) => {
  console.log('req.body:', req.body);
  var data = req.body;
  // user clicks on checkout -> want to make a new entry in the db
  if (data.formValue === 1) {
    var queryString = 'INSERT INTO userdata () VALUES ()';
  } else if (data.formValue === 2) {
    var hashedPassword = hashPassword(data.password);
    var queryString = 'UPDATE userdata SET name=?, email=?, password=? WHERE userdata.id=?';
    var queryArgs = [data.name, data.email, hashedPassword, data.id];
  } else if (data.formValue === 3) {
    var address = data.line1 + ' ' + data.line2;
    var queryString = 'UPDATE userdata SET address=?, city=?, state=?, zip=?, phone=? WHERE userdata.id=?';
    var queryArgs = [address, data.city, data.state, data.zip, data.phone, data.id];
  } else {
    var queryString = 'UPDATE userdata SET creditcard=?, expirationdate=?, cvv=?, cczip=? WHERE userdata.id=?';
    var queryArgs = [data.ccard, data.expdate, data.cvv, data.bzip, data.id];
  }

  connection.query(queryString, queryArgs, function (err, dataFromUpdate) {
    if (err) {
      console.log(err);
    } else {
      console.log(dataFromUpdate);
      if (data.formValue === 1) {
        res.json({id: dataFromUpdate.insertId});
        res.end();
      } else {
        res.json({id: data.id})
      }
    }
  });

});


// -------------------------------------------------------------------------------------
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
  console.log('salt', result)
  return result;
}

function hashPassword(password) {
  var salt = makeSalt(10);
  // var toHash = password + salt;
  console.log(salt, password);
  // using sha265
  const hash = crypto.createHash('sha256');
  hash.update(password + salt);
  return hash.digest('hex');
}
