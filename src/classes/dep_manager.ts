import { PrismaClient } from "../generated/prisma";
import UserRepository from "../repositories/user.respository";
import DocumentRepository from "../repositories/document.repository";
import UploadService from "../modules/file/file.service";
import EmailService from "../modules/email/email.service";
import UserService from "../modules/account/account.service";
import AuthService from "../modules/auth/auth.service";
import cloudinary from "cloudinary";
import { v2 } from "cloudinary";
import { IAppConfig } from "../utils/interface";
import { MailClient, NodemailerClient } from "../config/emailConfig";
import AuthController from "../api/auth/auth.controller";
import AccountController from "../api/account/account.controller";
type Repository = UserRepository | DocumentRepository;
type RepositoryKey = "user" | "document";
type Repositories = Record<RepositoryKey, Repository>;

type Service = UserService | UploadService | EmailService | AuthService;
type ServiceKey = "user" | "upload" | "email" | "auth";
type Services = Record<ServiceKey, Service>;

type Controller = AuthController | AccountController;
type Controllerkey = "user" | "auth";
type Controllers = Record<Controllerkey, Controller>;
// type Controllers =
export class DependencyManager {
  prisma: PrismaClient | null = null;
  mail: MailClient | null = null;
  cloudinary: typeof v2 | null = null;
  private services: Services | null = null;
  private controllers: Controllers | null = null;
  private repositories: Repositories | null = null;
  private static instance: DependencyManager | null = null;

  private constructor(private cfg: IAppConfig) {}

  setupPrisma() {
    if (!this.prisma) {
      this.prisma = new PrismaClient();
    }
  }

  setUpNodeMailer() {
    if (!this.mail) {
      this.mail = new NodemailerClient(
        this.cfg.email.address,
        this.cfg.email.password
      );
      return this.mail;
    }
    return this.mail;
  }

  cloudinaryInstance() {
    if (!this.cloudinary) {
      const cloudinaryV2 = cloudinary.v2;
      cloudinaryV2.config({
        cloud_name: this.cfg.cloudinary.cloud_name,
        api_key: this.cfg.cloudinary.api_key,
        api_secret: this.cfg.cloudinary.api_secret,
      });
      this.cloudinary = cloudinaryV2;
    }
    return this.cloudinary;
  }
  public static async getInstance(config: IAppConfig) {
    if (!DependencyManager.instance) {
      DependencyManager.instance = new DependencyManager(config);
      await DependencyManager.instance.init();
    }

    return DependencyManager.instance;
  }

  async init() {
    this.setupPrisma();
    this.setUpNodeMailer();
    this.cloudinaryInstance();
    this.repositories = {
      document: new DocumentRepository(this.prisma!),
      user: new UserRepository(this.prisma!),
    };
    this.services = {
      auth: new AuthService(this.getRepository<UserRepository>("user")),
      upload: new UploadService(this.cloudinaryInstance()),
      email: new EmailService(this.setUpNodeMailer()),
      user: null!,
    };
    (this.services as Services).user = new UserService( // Cast to Services to satisfy type checker
      this.getRepository<UserRepository>("user"),
      this.getService<UploadService>("upload") // 'upload' is now in `this.services`
    );
    console.log("DependencyManager: Services initialized.");
    this.controllers = {
      auth: new AuthController(this.getService<AuthService>("auth")),
      user: new AccountController(this.getService<UserService>("user")),
    };
  }

  async destroy() {
    this.repositories = null;
    await this.prisma?.$disconnect();
    this.prisma = null;
    this.services = null;
  }

  getRepository<T>(val: RepositoryKey) {
    if (!this.repositories) {
      throw new Error("Repositories not yet initialized");
    }
    return this.repositories[val] as T;
  }

  getService<T = any>(val: ServiceKey) {
    if (!this.services) {
      throw new Error("Services not yet initialized");
    }
    return this.services[val] as T;
  }
  getController<T>(val: Controllerkey) {
    if (!this.controllers) {
      throw new Error("Repositories not yet initialized");
    }
    return this.controllers[val] as T;
  }

  getConfig() {
    return this.cfg;
  }
}
