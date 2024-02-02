var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var sequelizeConfig = require("./config/sequelize.config");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminRouter=require('./routes/admin/adminRoutes');
var verifierRouter=require('./routes/verifier/verifierRoute');
var sponsorRouter=require('./routes/sponsors');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/events", usersRouter);
app.use('/sponsors',sponsorRouter);
app.use("/admin",adminRouter);
app.use("/verifier",verifierRouter);


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

(async () => {
  try {
    await sequelizeConfig.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  
    // sequelizeConfig.drop().then(()=>{
    //   console.log("Delete all table");
    // }).catch((err)=>{
    //   console.log("Error in dropping table: ",err);
    // })
    // Sync the model with the database
    sequelizeConfig
      .sync()
      .then(() => {
        console.log("All Tables created successfully");
      })
      .catch((error) => {
        console.error("Error creating table:", error);
      });
      

    console.log("Model synchronized with the database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = app;
