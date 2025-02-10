const compression = require("compression");
const express = require("express");
const cors = require("cors");
const { default: helmet, crossOriginResourcePolicy } = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(morgan("dev"));

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
require("./dbs/init.mongodb");
//init router

app.use("/api/v1", require("./routers"));

app.use((req, res, next) => {
  const error = new Error("not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "internal error",
  });
});
module.exports = app;
