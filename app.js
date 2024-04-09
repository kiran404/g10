const createError = require("http-errors");

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const appRouter = require("./routes");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get("/", function (req, res, next) {
  res.send("WORKING FINE");
});

app.use("/apiv1", appRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
const server = require("http").createServer(app);
const mysql = require("mysql");

// configuration
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "mydb",
  user: "root",
  password: "",
});

// executing connection
connection.connect(function (err) {
  if (err) {
    console.log(err);
    console.log("error occured while connecting");
  } else {
    console.log("Database connected");
  }
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json(err);
});

server.listen(process.env.PORT, "0.0.0.0", function () {
  console.log("Connected! at PORT ", process.env.PORT);
});
