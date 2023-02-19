const axios = require("axios");
const express = require("express");
const app = express();
const index_routes = require("./routes/index");

const cors = require("cors");
const origin = ["http://localhost:3000"];
app.use(cors({ origin }));

app.use(express.json());

app.use("/api/v1", index_routes);

// making the folder available public
app.use(express.static(`${__dirname}/uploads`)); // __dirname means current directors

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
    state: "error",
  });
});

module.exports = app;
