import winston from "winston";
import LokiTransport from "winston-loki";

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }),
];

// Only add Loki transport if LOKI_HOST is configured
if (process.env.LOKI_HOST) {
  try {
    const lokiTransport = new LokiTransport({
      host: process.env.LOKI_HOST,
      labels: { app: "my-express-app" },
      json: true,
      format: winston.format.json(),
      replaceTimestamp: true,
      onConnectionError: (err: unknown) => {
        console.warn(
          "Loki connection error (this is not fatal):",
          (err as Error).message
        );
      },
    });
    transports.push(lokiTransport);
  } catch (error) {
    console.warn("Failed to initialize Loki transport:", error);
  }
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.json(),
  transports,
});

export default logger;
