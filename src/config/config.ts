import { config } from "dotenv";

import { IAppConfig } from "../utils/interface";
config();

const getDefaultConfig = () => {
  const cfg: IAppConfig = {
    port: Number(process.env.port) || 3000,
    cloudinary: {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
      api_key: process.env.CLOUDINARY_API_KEY!,
      api_secret: process.env.CLOUDINARY_API_SECRET!,
    },
    redis: {
      username: process.env.REDIS_USERNAME!,
      password: process.env.REDIS_PASSWORD!,
      host: process.env.REDIS_HOST!,
      port: Number(process.env.REDIS_PORT),
    },
    database: {
      dialect: "postgres",
      url: "",
    },
    googleAuth: {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    email: {
      address: process.env.EMAIL!,
      password: process.env.EMAIL_PASSWORD!,
    },
  };

  return cfg;
};

export default getDefaultConfig;
