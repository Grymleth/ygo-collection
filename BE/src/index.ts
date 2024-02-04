import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import * as logging from "./config/logging";

const NAMESPACE = "App";

mongoose.connect(config.mongo.url, config.mongo.options).then(() => {
  logging.info(NAMESPACE, "Connected to MongoDB");
  app.listen(config.server.port, () => {
    logging.info(NAMESPACE, `Listening to port ${config.server.port}`);
  });
});
