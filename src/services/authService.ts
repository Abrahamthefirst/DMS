import UserRepo from "../repositories/user";
import { UserRegisterDTO, UserLoginDTO } from "../dtos/auth.dto";
import bcrypt from "bcryptjs";
import { emailQueue } from "../config/queue";
import { resetPasswordType } from "../types/utilTypes";
import { User } from "../generated/prisma";
import {
  generateJWT,
  generateRefreshJwt,
  verifyAccessJwt,
  verifyRefreshJwt,
} from "../utils/token";

class authService {
  static async registerUser(
    data: UserRegisterDTO
  ): Promise<User & { access_token: string; refresh_token: string }> {
    try {
      const hashed_password = bcrypt.hashSync(data.password);

      const { password, ...userDetails } = data;
      const user = await UserRepo.createUser({
        ...userDetails,
        hashed_password,
      });
      const refresh_token = generateRefreshJwt({ user });
      const access_token = generateJWT({ id: user.id });
      const verificationToken = generateJWT({ email: user.email });
      await emailQueue.add("send", {
        subject: "Email Verification",
        to: user.email,
        username: user.username,
        link: `http://localhost:3000/auth/email/verification/verify_by_link?token=${verificationToken}`,
        expiration: "1hr",
      });

      await UserRepo.updateUserById({
        id: user.id,
        refresh_token,
      });

      return { ...user, access_token, refresh_token };
    } catch (err) {
      throw err;
    }
  }

  static async loginUser(
    data: UserLoginDTO
  ): Promise<
    (User & { access_token: string; refresh_token: string }) | string
  > {
    try {
      const user = await UserRepo.getUserByEmail(data.email);
      const hashed_password = user?.hashed_password as string;
      if (!user) return "Email not found";
      const auth = bcrypt.compareSync(data.password, hashed_password);

      if (!auth) return "Password incorrect";
      const access_token = generateJWT({ id: user.id });
      const refresh_token = generateRefreshJwt({ user });

      await UserRepo.updateUserById({
        refresh_token,
      });
      return { ...user, access_token, refresh_token };
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

  static async loginWithGoogle(profile: { [key: string]: any }) {
    const email = profile.email as string;
    const username = profile.displayName as string;
    let user = await UserRepo.getUserByEmail(email);
    let accessToken;
    let refreshToken;

    if (user) {
      accessToken = generateJWT({ id: user.id });
      refreshToken = generateRefreshJwt({ email });
      console.log(profile._json.picture, "This is picture");
      console.log(user);
    }

    const newUser = await UserRepo.createUser({
      email,
      username,
      refresh_token: refreshToken,
      role: "VIEWER",
      picture: profile.picture,
    });

    accessToken = generateJWT({ id: newUser.id });
    refreshToken = generateRefreshJwt(newUser);

    return { accessToken, refreshToken, ...user };
  }
  static async verifyEmail(token: string): Promise<boolean> {
    try {
      const decoded = verifyAccessJwt(token) as { [key: string]: any };
      const user = await UserRepo.getUserByEmail(decoded.email);
      if (user) {
        UserRepo.updateUserByEmail({ ...user, email_verified: true });
        return true;
      }
      return false;
    } catch (err) {
      throw err;
    }
  }

  static async forgetPassword(email: string): Promise<boolean> {
    try {
      const user = await UserRepo.getUserByEmail(email);
      if (!user) return false;

      const verificationToken = generateJWT({ email: user.email });
      await emailQueue.add("send", {
        subject: "Password Verification",
        to: user.email,
        username: user.username,
        link: `http://localhost:3000/auth/password/reset?token=${verificationToken}`,
        expiration: "1hr",
      });

      return true;
    } catch (err) {
      throw err;
    }
  }

  static async resetPassword(data: resetPasswordType): Promise<boolean> {
    try {
      const { oldPassword, newPassword, email } = data;
      let user = (await UserRepo.getUserByEmail(email)) as User;
      const hashed_password = user.hashed_password as string;
      const passwordVersionCheck = bcrypt.compareSync(
        newPassword,
        hashed_password
      );

      if (passwordVersionCheck) return false;

      const newHashedPassword = bcrypt.hashSync(newPassword);
      user = { ...user, hashed_password: newHashedPassword };

      await UserRepo.updateUserByEmail(user);
      return true;
    } catch (err) {
      throw err;
    }
  }

  static async getAccessToken(token: string): Promise<any> {
    try {
      const user = verifyRefreshJwt(token) as { [key: string]: string };

      if (!user) return false;

      return generateJWT({ id: user.id });
    } catch (err) {
      throw err;
    }
  }

  static async logoutUser(id: string): Promise<boolean> {
    try {
      const user = await UserRepo.getUserById(Number(id));

      if (!user) return false;

      const { refresh_token, ...userDetails } = user;

      await UserRepo.updateUserById(userDetails);

      return true;
    } catch (err) {
      throw err;
    }
  }
}

export default authService;
