import express from "express";
import { login, signup } from "../controllers/users.js";

const router = express.Router();

router.post("/login", login); //post requests as we want to send data to the backend from the frontend
router.post("/signup", signup);

export default router;
