const express = require("express");
require('dotenv').config()
const PORT = process.env.PORT || 5000;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Api", apiKey: process.env.REACT_APP_API_KEY });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
