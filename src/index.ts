import express from "express";
import dotenv from "dotenv";

import passport from "passport";
import { googleAuthStrategy } from "./middleware/passport";
import getDefaultConfig from "./config/config";
import { DependencyManager } from "./classes/dep_manager";
import { errorHandler } from "./utils/errorHandler";
import { IAppConfig } from "./utils/interface";
import { registerAllApplicationRoutes } from "./routes/allRoutes";
dotenv.config();

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      [key: string]: any;
    };
    app_config: IAppConfig;
    dependencyManager: DependencyManager;
  }
}

declare module "express" {
  interface CookieOptions {
    sameSite?: "strict" | "lax" | "None";
  }
}

const startApp = async (dep_man: DependencyManager) => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(passport.initialize());
  googleAuthStrategy();
  registerAllApplicationRoutes(app, dep_man);
  app.use((req, res, next) => {
    req.app_config = dep_man.getConfig();
    req.dependencyManager = dep_man;
  });

  const port = dep_man.getConfig()?.port;
  app.listen(port, () => {
    if (port) {
      console.log("Server is running on port ", port);
    } else {
      console.log("Server is running");
    }
  });

  app.use(errorHandler);
};

(async () => {
  startApp(await DependencyManager.getInstance(getDefaultConfig())).catch(
    (err) => {
      console.log(err, "This is th eror");
    }
  );
})();
