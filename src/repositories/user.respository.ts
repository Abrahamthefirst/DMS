import { User } from "../generated/prisma";
import { Prisma } from "../generated/prisma";
import { ConflictError } from "../utils/error";
import { PrismaClient } from "@prisma/client";
class UserRepo {
  constructor(private prisma: PrismaClient) {}
  async createUser(
    data: Required<Pick<User, "email" | "username" | "role">> & Partial<User>
  ): Promise<User> {
    try {
      const userData = await this.prisma.user.create({
        data,
      });
      return userData;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw new ConflictError("Email already exits, try logging in");
        }
      }
      throw err;
    }
  }
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const userData = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      return userData;
    } catch (err) {
      throw err;
    }
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (err) {
      throw err;
    }
  }

  async updateUserById(user: Partial<User>): Promise<User | null> {
    try {
      const { id, ...data } = user;
      const userData = await this.prisma.user.update({
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

  async updateUserByEmail(user: Partial<User>): Promise<User | null> {
    try {
      // handle if email not found
      const { email, ...data } = user;
      const userData = await this.prisma.user.update({
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
  async deleteUserById(id: number): Promise<User | null> {
    try {
      const user = await this.prisma.user.delete({
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
