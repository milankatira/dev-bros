const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");

app.use(express.json({ limit: "8mb" }));

app.use(cookieParser());

const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middleware/error");

const product = require("./routes/productRoute");

const user = require("./routes/userRoutes");

const jobs = require("./routes/jobs");

const order = require("./routes/orderRoutes");

const generic_data = require("./routes/generic_data");

const profile = require("./routes/profileRoutes");

const company = require("./routes/company");

const exam = require("./routes/exam");

const dotenv = require("dotenv");

const question = require("./routes/question");

const codingquestion = require("./routes/codingquestion");

const candidateGroup = require("./routes/candidates");

const group = require("./routes/group");

const assignExam = require("./routes/assignexam");

const code = require("./routes/code");

const result = require("./routes/result");

dotenv.config({ path: "./config/config.env" });

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
console.log(process.env.SESSION_SECRET);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new RedisStore({ client: RedisClient.getRedisClientForSession() }),
    saveUninitialized: true,
    resave: false,
  })
);

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
  question,
  candidateGroup,
  group,
  assignExam,
  code,
  result,
  codingquestion,
]);

app.use(errorMiddleware);

module.exports = app;
