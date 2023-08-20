const express = require("express");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const flash = require("connect-flash");

const db = require("./config/mongoose");
const env = require("./config/environment");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-strategy");
const customMiddleware = require("./config/middleware");

const app = express();
require("./config/view-helpers")(app);
const port = 8000;
console.log(env.name);
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(expressLayouts);
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.static(env.asset_path));
app.use(morgan(env.morgan.mode, env.morgan.options));

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("view engine", "ejs");
app.set("views", "views");

// Session Configuration
app.use(
  session({
    name: "Cookie",
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create(
      {
        mongoUrl: `mongodb://127.0.0.1:27017/${env.db}`,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        autoRemove: "interval",
        autoRemoveInterval: 10,
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
    cookie: {
      maxAge: 1000 * 60 * 10,
    },
  })
);

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMiddleware.setFlash);

// Routes
const router = require("./routes/home");
app.use("/", router);

// Start Server
app.listen(port, (err) => {
  if (err) {
    console.log(`Error in Connecting to Server ${err}`);
  }
  console.log(`Server is up and running on port: ${port}`);
});
