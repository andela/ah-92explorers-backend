import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swagger from "./swaggerSetUp/swaggerSetup";
import welcomeRouter from "./routes/welcomeRouter";

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require("method-override")());
app.use(express.static(__dirname + "/public"));

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swagger.swaggerSpec);
});
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swagger.swaggerSpec));

app.use(
  session({
    secret: "authorshaven",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

require("./models/User");

app.use(require("./routes"));
app.use("/welcome", welcomeRouter);

/// catch 404 and forward to error handler
app.use(function(_req, _res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// no stacktraces leaked to user
app.use((err, res) => {
  if (err) {
    return res.status(err.status || 500);
  }

  return res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port " + server.address().port);
});

export default app;
