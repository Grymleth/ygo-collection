import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./router";
dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080/");
});

const MONGO_URL = process.env.MONGO_DB_HOST;

console.log("MONGO_URL: ", MONGO_URL);
mongoose.Promise = Promise;
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Successfully Connected to MongoDB Server"));
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router);
app.use(
  (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500);
    res.json({
      message: error.message,
      error: error,
    });

    return res;
  }
);
