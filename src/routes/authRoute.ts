import express from "express";
import AuthController from "../api/auth/auth.controller";
import passport from "passport";

export function createAuthRouter(authController: AuthController) {
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

  router.post(
    "email/request_email_verification",
    authController.emailVerificationLink
  );
  router.post("/email/verify-email", authController.verifyEmail);

  router.post("/forgot-password", authController.forgotPassword);

  router.post("/reset-password", authController.resetPassword);

  router.post("/refresh-token", authController.refreshToken);

  router.post("/logout", authController.logout);
  return router;
}
