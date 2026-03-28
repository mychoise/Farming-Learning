import express from "express";
import { body, validationResult } from "express-validator";
import { register, login, refresh } from "./../controllers/auth.controller.js";
const authRouter = express.Router();

const registerValidation = [
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
  body("name").isLength({ min: 3 }),
];
const loginValidation = [
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
];

authRouter.post("/register", registerValidation, register);
authRouter.post("/login", loginValidation, login);
authRouter.get("/refresh", refresh);

export default authRouter;
