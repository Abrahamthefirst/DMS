import express from "express";
import authController from "../controllers/authController";
import passport from "passport";
const router = express.Router();


router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.post(
  "/api/session/oauth/google",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  authController.googleAuth
);

router.post("/verify-email", authController.verifyEmail);

router.post("/forgot-password", authController.forgotPassword);

router.post("/reset-password", authController.resetPassword);

router.post("/refresh-token", authController.refreshToken);

router.post("/logout", authController.logout);

export default router;
