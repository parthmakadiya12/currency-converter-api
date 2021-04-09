import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index";
import usersRouter from "./routes/convert";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", indexRouter);
app.use("/convert", usersRouter);

app.use((error, req, res, next) => {
  return res.status(500).json({
    error: error.toString(),
  });
});

export default app;
