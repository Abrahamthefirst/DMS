import { UserRegisterDTO } from "../dtos/auth.dto";
import { User } from "../generated/prisma";
import prisma from "../config/dbConfig";
class UserRepo {
  static async createUser(user: Partial<User>): Promise<User> {
    try {
      const userData = await prisma.user.create({ user });
      return userData;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const userData = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      return userData;
    } catch (err) {
      throw err;
    }
  }

  static async getUserById(id: number): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (err) {
      throw err;
    }
  }

  static async updateUserById(user: Partial<User>): Promise<User | null> {
    try {
      const { id, ...data } = user;
      const userData = await prisma.user.update({
        where: {
          id,
        },
        data,
      });
      return userData;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async updateUserByEmail(user: Partial<User>): Promise<User | null> {
    try {
      const { email, ...data } = user;
      const userData = await prisma.user.update({
        where: {
          email,
        },
        data,
      });
      return userData;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  static async deleteUserById(id: number): Promise<User | null> {
    try {
      const user = await prisma.user.delete({
        where: {
          id,
        },
      });

      return user;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default UserRepo;
