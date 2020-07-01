const express = require('express');
const app = express();
const port = 3000;
// make sure it's safe to send text, escaped for html

app.use(express.urlencoded()); // for parsing application/x-www-form-urlencoded

// serving an index file from the server using .static,
// filepath is relative to the server.js
app.use(express.static('../client'));

// for get we go to static, for post we do this:
app.post('/', (req, res) => {
  var toJson = JSON.parse(req.body.json);
  var jsonToString = JSON.stringify(toJson, null, 4);
  // we need 2 formats - original and new
  var newFormat = csvConverter(toJson);
  // adding both type of data to template and sending it back to the client
  var data = template(jsonToString, newFormat);
  res.send(data);
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

// Functions to modify the JSON
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