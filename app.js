var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var services = require("./routes/allRoutes");
var indexRouter = require("./routes/allRoutes");
var usersRouter = require("./routes/users");
var { ReqAuth } = require("./services/firewallToken");
var app = express();
const port = 3000;
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://maynkraftalhosni:reem123123@cluster0.ivva45d.mongodb.net/DATABASE_USERS?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("تم الاتصال بنجاح");
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.use(services);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
