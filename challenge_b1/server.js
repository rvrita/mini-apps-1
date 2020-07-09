const express = require('express');
const app = express();
const port = 3000;

// will serve index
app.use(express.static('public'));

// app.get('/', (req, res) => res.send('hello from express'))

app.listen(port, () => console.log(`Listening at http://localhost/${port}`));