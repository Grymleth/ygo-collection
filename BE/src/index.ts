import app from "./app";
import config from "./config";
import * as logging from "./config/logging";

const NAMESPACE = "App";

app.listen(config.server.port, () => {
  logging.info(
    NAMESPACE,
    `Server running on ${config.server.hostname}:${config.server.port}`
  );
});
