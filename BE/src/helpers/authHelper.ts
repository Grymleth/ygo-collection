import crypto from "crypto";
import config from "../config";

export const random = () => crypto.randomBytes(128).toString("base64");
export const hash = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(config.secret.AUTH_SECRET)
    .digest("hex");
};
