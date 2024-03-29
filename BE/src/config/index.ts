import dotenv from "dotenv";

dotenv.config();

// mongo db config
const MONGO_OPTIONS = {
  retryWrites: false,
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || "none";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "none";
const MONGO_HOST = process.env.MONGO_URL || "none";

// mongo db config
const MONGO = {
  host: MONGO_HOST,
  password: MONGO_PASSWORD,
  username: MONGO_USERNAME,
  options: MONGO_OPTIONS,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
};

// server config
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 5000;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

// secrets
const SECRET = {
  AUTH_SECRET: process.env.SECRET,
};

const config = {
  mongo: MONGO,
  server: SERVER,
  secret: SECRET,
};

export default config;
