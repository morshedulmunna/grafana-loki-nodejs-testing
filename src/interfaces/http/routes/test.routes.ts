import { Router, Request, Response } from "express";
import { TestController } from "../controllers/TestController";

const router = Router();

router.get("/test-logs", async (req: Request, res: Response) => {
  await TestController.testLogs(req, res);
});

export default router;
