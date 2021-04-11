import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import convertRouter from "./routes/convert";
import conversionReqValidator from "./middlewares/convertionReqValidator";
import corsMiddleware from "./middlewares/corsMiddleware";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(corsMiddleware);
app.use(express.static(path.join(__dirname, "../public")));

app.use("/convert", conversionReqValidator, convertRouter);

app.use((error, req, res, next) => {
  return res.status(500).json({
    error: error.toString(),
  });
});

export default app;
