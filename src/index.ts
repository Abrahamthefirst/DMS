import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";
import authenticate from "./middleware/authenticate";
import adminAuthorization from "./middleware/adminAuthorization";
import editorAuthoriation from "./middleware/editorAuthorization";

import { googleAuthStrategy } from "./middleware/passport";
import { errorHandler } from "./utils/errorHandler";
import passport from "passport";
dotenv.config();
const app = express();
app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
googleAuthStrategy();

const PORT = process.env.PORT;
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

app.use("/auth", authRoute);


app.use(authenticate);

app.use(adminAuthorization);
app.use(editorAuthoriation);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
