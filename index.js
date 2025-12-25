const express = require('express');

const app = express();

app.get('/login', (req, res) => {
  res.send('login printed!');
});

app.get('/logout', (req, res) => {
  res.send('logout printed!');
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is running at http://0.0.0.0:3000');
});