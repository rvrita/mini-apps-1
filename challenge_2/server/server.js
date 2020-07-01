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
  console.log(req.body);
  var data = req.body;
  res.send(data);
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
