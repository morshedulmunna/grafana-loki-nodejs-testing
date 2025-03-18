import { Request, Response } from "express";
import { ApiResponse } from "@/core/ApiResponse";
import { logger } from "@/utils/logger";

export class TestController {
  public static async testLogs(req: Request, res: Response) {
    // Test different log levels
    logger.info("This is an info log", {
      endpoint: "/test-logs",
      method: "GET",
      timestamp: new Date().toISOString(),
    });

    logger.warn("This is a warning log", {
      endpoint: "/test-logs",
      method: "GET",
      timestamp: new Date().toISOString(),
    });

    logger.error("This is an error log", {
      endpoint: "/test-logs",
      method: "GET",
      timestamp: new Date().toISOString(),
      error: "Test error message",
    });

    return res.json(
      ApiResponse.success({ message: "Logs generated successfully" })
    );
  }
}
