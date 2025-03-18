import "dotenv/config";
import App from "./app";
import logger from "./config/logger-configs";

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  logger.error("Unhandled Rejection:", error);
  process.exit(1);
});

const app = new App();
app.listen();
