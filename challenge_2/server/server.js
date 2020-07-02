const express = require('express');
const app = express();
const port = 3000;
var fs = require('fs');
// make sure it's safe to send text, escaped for html

// app.use(express.urlencoded()); // for parsing application/x-www-form-urlencoded

// serving an index file from the server using .static,
// filepath is relative to the server.js
app.use(express.static('../client'));

// for get we go to static, for post we do this:
app.post('/', (req, res) => {
  // handleText(req, res); // Part 1
  // handleUpload(req, res); // Part 2
  handleAjaxUpload(req, res); // Part 3
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

// html to send back
var template = function (oldFormat, newFormat) {
  return `
<!DOCTYPE html><html>
<head>
<title>Json to CSV converter</title>
<link rel="stylesheet" href="css/main.css">
<link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.5.0.js"></script>
</head>
<body>
<div id="main-container">
<h1>JSON to CSV</h1>
<div id="form-container">
<h2>Paste your JSON here:</h2>
<form id="form" action="/" method="post">
<p>
<label for="paste-json"></label>
<textarea id="paste-json" name="json" rows="20" cols="80">${oldFormat}</textarea>
</p>
<p>
<label for="json-file">Choose a json file:</label>
<input type="file" id="json-file" name="json-file" accept=".json"><br/>
</p>
<input type="submit" id="submit">
</form>
</div>
<div>
<p id="form-result">
<h2>Your CSV:</h2>
<label for="result"></label>
<textarea id="result" name="result" rows="10" cols="80">${newFormat}</textarea>
</p>
</div>
</div>
<script src="app.js"></script>
</body>
</html>
`};

// Functions to modify the JSON - Part 1

var handleText = function (req, res) {
  var toJson = JSON.parse(req.body.json);
  var jsonToString = JSON.stringify(toJson, null, 4);
  var newFormat = csvConverter(toJson);
  var data = template(jsonToString, newFormat);
  res.send(data);
}


var getFirstLine = function (data) {
  var firstLine = '';
  // adding keys in the first line of the file
  var keysArray = Object.keys(data);
  for (var i = 0; i < keysArray.length; i++) {
    firstLine += keysArray[i] + ',';
  }
  firstLine = firstLine.replace(',children,', '\n');
  return firstLine;
}

var csvConverter = function (data) {
  var result = '';
  // get keys for first line
  result += getFirstLine(data);

  var getValues = function (data) {
    var values = '';
    for (var [key, value] of Object.entries(data)) {
      if (key !== 'children') {
        values += `${value},`;
      } else {
        for (var i = 0; i < value.length; i++) {
          getValues(value[i]);
        }
      }
    }
    var lastComma = values.lastIndexOf(',');
    result += values.substring(0, lastComma) + '\n';
  }

  getValues(data);
  return result;
};

// Part 2
var handleUpload = function (req, res) {
  var buffer = Buffer.alloc(0);
  req.on('data', (chunk) => {
    buffer = Buffer.concat([buffer, chunk]);
  }).on('end', () => {
    // binary -> string to get the data back
    var data = buffer.toString('utf8');
    // keeping only the json part
    data = data.split('application/json')[1];
    data = data.split('------')[0].trim();
    // for converter we need JSON
    var toJson = JSON.parse(data);
    var newFormat = csvConverter(toJson);

    var updatedPage = template(data, newFormat);
    res.send(updatedPage);
  });
}

// Part 3
var handleAjaxUpload = function (req, res) {
  var buffer = Buffer.alloc(0);
  req.on('data', (chunk) => {
    buffer = Buffer.concat([buffer, chunk]);
  }).on('end', () => {
    // binary -> string to get the data back
    var data = buffer.toString('utf8');
    // keeping only the json part
    data = data.split('application/json')[1];
    data = data.split('------')[0].trim();
    // for converter we need JSON
    var toJson = JSON.parse(data);
    var newFormat = csvConverter(toJson);
    var allData = {
      old: data,
      new: newFormat
    };
    res.send(allData);
  });
}
