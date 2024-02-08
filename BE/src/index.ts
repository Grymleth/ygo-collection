import mongoose from "mongoose";
import http from "http";
import app from "./app";
import config from "./config";
import * as logging from "./config/logging";

const NAMESPACE = "App";

const server = http.createServer(app);

mongoose.connect(config.mongo.url, config.mongo.options).then(() => {
  logging.info(NAMESPACE, "Connected to MongoDB");
  server.listen(config.server.port, () => {
    logging.info(NAMESPACE, `Listening to port ${config.server.port}`);
  });
});
