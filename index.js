const express = require("express");
const path = require('path');
require('dotenv').config()
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.resolve(__dirname, './client/build')));

app.get("/api", (req, res) => {
  res.json({apiKey: process.env.REACT_APP_API_KEY });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

