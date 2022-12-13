const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// set up express app
const app = express();

// connect to mongodb
mongoose.connect("mongodb://localhost/ninjago");
mongoose.Promise = global.Promise;

app.use(express.static("public"));
app.use(bodyParser.json());

// initiate routes
app.use("/api", require("./routes/api"));

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.listen(process.env.port || 4000, function () {});
