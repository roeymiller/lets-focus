const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const mongoose = require("mongoose");
const userRoutes = require("../routes/user");
const MeetingRoutes = require("../routes/Meeting-router");

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, userid, expirations, authorization, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
//app.use(express.json);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// db.on("error", console.error.bind(console, "MongoDB connection error:"));

mongoose
  .connect(
    "mongodb+srv://May:8075492@cluster0.u5qtz.mongodb.net/LetsFocus?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
app.use("/api/user", userRoutes);
app.use("/api", MeetingRoutes);

app.listen(3002, () =>
  console.log("Express server is running on localhost:3002")
);
