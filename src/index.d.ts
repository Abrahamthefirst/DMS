declare module "express-serve-static-core" {
  interface Request {
    user?: {
      [key: string]: any;
    };
  }
}

declare module "express" {
  interface CookieOptions {
    sameSite?: "strict" | "lax" | "None";
  }
}
