// src/index.ts
import pino from "pino";
function createLogger(options = {}) {
  const { name, level, destination, streams } = options;
  const isDev = process.env.NODE_ENV !== "production";
  const pinoOptions = {
    name,
    level: level ?? (isDev ? "debug" : "info")
  };
  if (streams) {
    return pino(pinoOptions, pino.multistream(streams));
  }
  return destination ? pino(pinoOptions, destination) : pino(pinoOptions);
}
export {
  createLogger
};
