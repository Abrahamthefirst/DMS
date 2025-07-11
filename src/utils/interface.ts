export interface IAppConfig {
  redis: {
    port: number;
    username: string;
    host: string;
    password: string;
  };
  database: {
    dialect: "postgres";
    url: "";
  };
  cloudinary: {
    cloud_name: string;
    api_key: string;
    api_secret: string;
  };
  email: {
    address: string;
    password: string;
  };
  port: number;
  googleAuth: {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
  };
}


// postgresql://user:password@localhost/mydatabase
// format: postgresl://user_name:password@host:port/db_name
// postgresql://username:password@host:port/db_name
