import jwt, { JwtPayload } from "jsonwebtoken";

const accessSecret: string = process.env.ACCESS_TOKEN || "";
const refreshSecret: string = process.env.REFRESH_TOKEN || "";
export const generateJWT = function (payload: object) {
  return jwt.sign(payload, accessSecret, { expiresIn: "1h" });
};

export const generateRefreshJwt = function (payload: object) {
  return jwt.sign(payload, refreshSecret, { expiresIn: "1d" });
};

export const verifyAccessJwt = function (token: string): JwtPayload {
  try {
    const payload = jwt.verify(token, accessSecret);
    return payload;
  } catch (err) {
    throw err;
  }
};

export const verifyRefreshJwt = function (token: string): JwtPayload {
  try {
    const payload = jwt.verify(token, refreshSecret);
    return payload;
  } catch (err) {
    throw err;
  }
};
