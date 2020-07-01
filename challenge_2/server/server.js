const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded()); // for parsing application/x-www-form-urlencoded

// serving an index file from the server using .static,
// filepath is relative to the server.js
app.use(express.static('../client'));

// for get we go to static, for post we do this:
app.post('/', (req, res) => {
  var json = JSON.stringify(req.body);
  var data = template(json, json);
  res.send(data);
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));


// html to send back
var template = function(oldFormat, newFormat) {
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
<textarea id="result" name="result" rows="20" cols="80">${newFormat}</textarea>
</p>
</div>
</div>
<script src="app.js"></script>
</body>
</html>
`};