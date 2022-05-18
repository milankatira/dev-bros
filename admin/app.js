const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");

app.use(express.json());

app.use(cookieParser());

const bodyParser = require("body-parser");

const fileUpload = require("express-fileupload");

const errorMiddleware = require("./src/middleware/error");

const user = require("./src/routes/userRoutes");

const city = require("./src/routes/city");

const country = require("./src/routes/country");

const state = require("./src/routes/state");

const degree = require("./src/routes/degree");

const designation = require("./src/routes/designation");

const institution=require("./src/routes/institution");

const user_roll=require("./src/routes/user_roll");

const plan=require("./src/routes/plan");

const subscription_plan = require("./src/routes/subscription_plans");

const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const cors = require("cors");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const RedisClient = require("./config/redis.config.js");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new RedisStore({ client: RedisClient.getRedisClientForSession() }),
    saveUninitialized: true,
    resave: false,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

app.use("/api/v1", user);

app.use("/api/v1", city);

app.use("/api/v1", country);

app.use("/api/v1", state);

app.use("/api/v1", degree);

app.use("/api/v1", designation);

app.use("/api/v1", institution);

app.use("/api/v1", user_roll);

app.use("/api/v1", plan);

app.use("/api/v1",subscription_plan);

app.use(errorMiddleware);

module.exports = app;
