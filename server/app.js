const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");

app.use(express.json({ limit: "8mb" }));
app.use(cookieParser());

const bodyParser = require("body-parser");

const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middleware/error");

const product = require("./routes/productRoute");

const user = require("./routes/userRoutes");

const jobs = require("./routes/jobs");

const order = require("./routes/orderRoutes");

const generic_data = require("./routes/generic_data");

const payment = require("./routes/paymentRoute");

const profile = require("./routes/profileRoutes");

const company = require("./routes/company");

const exam = require("./routes/exam");

const dotenv = require("dotenv");

const question=require('./routes/question');

dotenv.config({ path: "server/config/config.env" });

const cors = require("cors");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const RedisClient = require("./config/redis.config.js");


const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new RedisStore({ client: RedisClient.getRedisClientForSession() }),
    saveUninitialized: true,
    resave: false,
  })
);

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

app.use(express.static(`${__dirname}/static`));
app.use("/api", [
  product,
  user,
  order,
  profile,
  generic_data,
  jobs,
  company,
  exam,
  question
]);

app.use(errorMiddleware);

module.exports = app;
