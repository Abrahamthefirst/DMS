import UserRepository from "../../repositories/user.respository";
import { User } from "../../generated/prisma";
import { Document } from "../../generated/prisma";
import UploadService from "../file/file.service";
class AccountService {
  constructor(
    private userRepository: UserRepository,
    private uploadService: UploadService
  ) {}
  async getUser(id: string): Promise<User | null> {
    try {
      const user = await this.userRepository.getUserById(Number(id));
      return user;
    } catch (err) {
      throw err;
    }
  }

  async getAllUsers(id: string): Promise<User | null> {
    try {
      const user = await this.userRepository.getUserById(Number(id));
      return user;
    } catch (err) {
      throw err;
    }
  }

  async updateUser(user: Partial<User>): Promise<User | null> {
    try {
      const updatedUser = await this.userRepository.updateUserById(user);
      return updatedUser;
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(id: string): Promise<{ id: string } | null> {
    try {
      const updatedUser = await this.userRepository.deleteUserById(Number(id));
      return { id: String(updatedUser?.id) };
    } catch (err) {
      throw err;
    }
  }

  async upload(id: string, files: Express.Multer.File[]): Promise<void> {
    try {
      // const user = await this.uploadService.upload(id, files);
      // res.status(200).json({ user });
    } catch (err) {
      // next(err);
      throw err;
    }
  }

  // static async getDocuments(): Promise<void> {
  //   try {
  //     const documents = await this.userRepository.getEditorDocuments(req.user?.id);
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}

export default AccountService;
