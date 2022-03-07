const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("/api", (req, res) => {
  const testApi = res.json({ apiKey: process.env.REACT_APP_API_KEY });
});

app.get("/api/pictureday", (req, res) => {
  const query = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}`;
  axios
    .request(query)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/api/mars", (req, res) => {
  const query = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.REACT_APP_API_KEY}`;
  axios
    .request(query)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/api/near-earth-objects", (req, res) => {
  const query = {
    method: "GET",
    url: "https://api.nasa.gov/neo/rest/v1/feed?",
    params: {
      start_date: req.query.start_date,
      end_date: req.query.end_date,
      api_key: process.env.REACT_APP_API_KEY,
    },
  };
  axios
    .request(query)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/api/space-weather", (req, res) => {
  const query = {
    method: "GET",
    url: `https://api.nasa.gov/DONKI/${req.query.type}`,
    params: {
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      api_key: process.env.REACT_APP_API_KEY,
    },
  };
  axios
    .request(query)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => console.log(err));
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
