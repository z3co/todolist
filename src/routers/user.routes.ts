import { Router } from "express";
const router = Router();

import { register } from "../controllers/user.controller";

router.post("/users", register);

export default router;
