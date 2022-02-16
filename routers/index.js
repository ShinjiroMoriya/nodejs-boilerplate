import { Router } from "express";
import Top from "../controllers/top.js";
import Login from "../controllers/login.js";

const router = Router();

router.use((req, res, next) => {
  next();
});

router.get("/", Top.asView);
router.get("/login", Login.asView);
router.post("/login", Login.asView);

export default router;
