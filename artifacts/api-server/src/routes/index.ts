import { Router, type IRouter } from "express";
import healthRouter from "./health";
import anTokenRouter from "./an-token";

const router: IRouter = Router();

router.use(healthRouter);
router.use(anTokenRouter);

export default router;
