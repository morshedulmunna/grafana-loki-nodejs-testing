import winston from "winston";
import LokiTransport from "winston-loki";

interface LogContext {
  userId?: string;
  action?: string;
  timestamp?: string;
  [key: string]: any;
}

class Logger {
  private logger: winston.Logger;

  constructor() {
    const transports: winston.transport[] = [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          winston.format.printf(({ timestamp, level, message, ...meta }) => {
            return `${timestamp} [${level}]: ${message} ${
              Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
            }`;
          })
        ),
      }),
    ];

    // Add Loki transport if configured
    if (process.env.LOKI_HOST) {
      try {
        transports.push(
          new LokiTransport({
            host: process.env.LOKI_HOST,
            labels: { app: "my-express-app" },
            json: true,
            format: winston.format.json(),
            replaceTimestamp: true,
            onConnectionError: (err: Error) => {
              console.warn("Loki connection warning:", err.message);
            },
          })
        );
      } catch (error) {
        console.warn("Failed to initialize Loki transport:", error);
      }
    }

    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports,
    });
  }

  private formatMessage(
    message: string,
    context?: LogContext
  ): [string, LogContext] {
    const logContext = {
      ...context,
      timestamp: context?.timestamp || new Date().toISOString(),
    };

    return [message, logContext];
  }

  info(message: string, context?: LogContext) {
    const [formattedMessage, formattedContext] = this.formatMessage(
      message,
      context
    );
    this.logger.info(formattedMessage, formattedContext);
  }

  error(message: string, context?: LogContext) {
    const [formattedMessage, formattedContext] = this.formatMessage(
      message,
      context
    );
    this.logger.error(formattedMessage, formattedContext);
  }

  warn(message: string, context?: LogContext) {
    const [formattedMessage, formattedContext] = this.formatMessage(
      message,
      context
    );
    this.logger.warn(formattedMessage, formattedContext);
  }

  debug(message: string, context?: LogContext) {
    const [formattedMessage, formattedContext] = this.formatMessage(
      message,
      context
    );
    this.logger.debug(formattedMessage, formattedContext);
  }
}

export const logger = new Logger();
