import express from "express";

import {
  registerUser,
} from "../controllers/auth.controller.js";

import {
  registerValidation,
  loginValidation
} from "../validations/auth.validation.js";

import {
  authenticate,
} from "../middlewares/auth.middleware.js";

import {
  validate,
} from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post( "/register", registerValidation, validate, registerUser );

router.post( "/login", loginValidation, validate, loginUser );

/* --------------------------- Protected Route ---------------- */
    
router.get( "/me", authenticate, (req, res) => res.json({ success: true, user: req.user }));

export default router;