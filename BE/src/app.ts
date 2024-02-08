import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import router from "./routes";
import ApiError from "./classes/ApiError";
import * as logging from "./config/logging";

const NAMESPACE = "App";

const app = express();

/* Cors */
app.use(
  cors({
    credentials: true,
  })
);

/* cookies */
app.use(cookieParser());

/* Request Logging */
app.use(morgan("combined"));

/* Parse the request */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Rules of the API  */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET POST");
    return res.status(200).json({});
  }

  next();
});

/* Routes */
app.use("/", router());

/* Error Handling */

app.use((req: Request, res: Response, next: NextFunction) => {
  const apiError = new ApiError("Error 404 Not Found", 404);
  next(apiError);
});

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);

  logging.info(NAMESPACE, "Something went wrong", error);
  res.json({
    message: error.message,
    error: error,
  });
});

export default app;
