import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "./config/logger-configs";
import { errorHandler } from "./core/ErrorHandler";
import testRoutes from "./interfaces/http/routes/test.routes";

export default class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(helmet());

    // Request logging middleware
    this.app.use((req, res, next) => {
      logger.info({
        method: req.method,
        path: req.path,
        ip: req.ip,
      });
      next();
    });
  }

  private initializeRoutes() {
    this.app.use("/api", testRoutes);
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler as express.ErrorRequestHandler);
  }

  public listen() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  }
}
