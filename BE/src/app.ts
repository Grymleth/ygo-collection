import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";

import ApiError from "./classes/ApiError";

const app = express();

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

app.get("/", (req: Request, res: Response) => {
  const error = new ApiError("Test Error");

  error.status = 469;
  throw error;
});

/* Routes */

/* Error Handling */

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new ApiError("Error 404 Not Found");
  error.status = 404;
  next(error);
});

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);

  res.json({
    message: error.message,
    error: error,
  });
});

export default app;