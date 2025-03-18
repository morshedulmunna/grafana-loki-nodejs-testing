import { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiError";
import { ApiResponse } from "./ApiResponse";
import logger from "../config/logger-configs";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    logger.error({
      message: err.message,
      stack: err.stack,
      statusCode: err.statusCode,
    });

    res.status(err.statusCode).json(ApiResponse.error(err.message));
    return;
  }

  // Unhandled errors
  logger.error({
    message: err.message,
    stack: err.stack,
    statusCode: 500,
  });

  res.status(500).json(ApiResponse.error("Something went wrong!"));
};
