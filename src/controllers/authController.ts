import { Request, Response, NextFunction } from "express";
import authService from "../services/authService";
import { UserLoginDTO, UserRegisterDTO } from "../dtos/auth.dto";
class authController {
  static async signup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {

      console.log("This is he reques")
      const { error, value } = UserRegisterDTO.validate(req.body);
      
      if (error) {
        res.status(400).json({ message: error.message });
        return;
      }
      console.log("This is value", value, "Req body", req.body)
      const user = await authService.registerUser(req.body);
      const { refresh_token, ...userDetails } = user;

      res.cookie("jwt", refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      // throw err;
    }
  }
  static async login(req: Request, res: Response): Promise<void> {
    try {
      console.log("Trying to login")
      const { error, value } = UserLoginDTO.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.message });
        return;
      }
      const user = await authService.loginUser(value);
      if (typeof user === "string") {
        res.status(400).json({ message: user });
        return;
      }

      const { refresh_token, ...userDetails } = user;

      res.cookie("jwt", refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  static async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      const token = req.query.token as string;

      const response = await authService.verifyEmail(token);

      // Come back to put a frontend url
      if (response) res.redirect("");

      return res.redirect("");
    } catch (err) {
      const error = err as Error;
      if (error.name === "Token Expired Error")
        res.status(400).json({
          message: "Link has expired, request for a new verification link",
        });
      return;
    }
  }
  static async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const response = await authService.forgetPassword(req.body.email);

      if (!response) {
        res.status(400).json({ message: "Email not found" });
        return;
      }

      res.status(200).json({ message: "Check mail to reset your password" });
    } catch (err) {
      console.log(err);
    }
  }
  static async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const response = await authService.resetPassword(req.body);

      if (!response) {
        res
          .status(400)
          .json({ message: "Old Password cannot be the same as new Password" });
        return;
      }

      res
        .status(200)
        .json({ message: "Password has been updated successfully" });
    } catch (err) {
      console.log(err);
    }
  }
  static async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const response = await authService.getAccessToken(
        req.cookies.refreshToken
      );
      if (response) res.status(200).json({ response });
    } catch (err) {
      const error = err as Error;
      if (error.name === "Token Expired Error") {
        res.status(200).json({ message: "You need to login" });
      }
    }
  }
  static async logout(req: Request, res: Response): Promise<void> {
    try {
      const id = req.user?.id as string;
      const response = await authService.logoutUser(id);
      if (response) res.status(200).json({ message: "Logout Successful" });
    } catch (err) {
      console.log(err);
    }
  }

  static async googleAuth(req: Request, res: Response) {
    try {
      const { accessToken, refreshToken } = await authService.loginWithGoogle(
        req.user!
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.redirect(`http://localhost:3001/login?token=${accessToken}`);
    } catch (err) {
      const error = err as Error;
      res.status(400).json({ message: error.message });
    }
  }
}

export default authController;
