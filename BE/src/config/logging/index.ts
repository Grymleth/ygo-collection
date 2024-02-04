const getTimeStamp = () => {
  return new Date().toISOString();
};

export const info = (namespace: string, message: string, object?: Object) => {
  if (object) {
    console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
  } else {
    console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
  }
};

export const warn = (namespace: string, message: string, object?: Object) => {
  if (object) {
    console.log(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
  } else {
    console.log(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
  }
};

export const error = (namespace: string, message: string, object?: Object) => {
  if (object) {
    console.log(
      `[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`,
      object
    );
  } else {
    console.log(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
  }
};

export const debug = (namespace: string, message: string, object?: Object) => {
  if (object) {
    console.log(
      `[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`,
      object
    );
  } else {
    console.log(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
  }
};
