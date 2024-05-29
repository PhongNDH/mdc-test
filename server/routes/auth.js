import express from "express";
import { createUserRandomly, detectPassword, getUsername, Signin, Signup } from "../controllers/auth.js";
const router = express.Router();

router.post("/signin", Signin);
router.post("/signup", Signup);
router.post("/create-user", createUserRandomly);
router.post("/check-username", getUsername);
router.post("/detect-password", detectPassword);

export { router };