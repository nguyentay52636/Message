import { Router } from "express";

const router = Router();

router.get("/ping", (_req:any, res :any) => {
  res.json({ message: "pong" });
});

export default router;
