import { Request, Response, NextFunction } from "express";
import { verifyAccessJwt } from "../utils/token";
import { TokenExpiredError } from "jsonwebtoken";

type decoded = {
  [key: string]: any;
};
export default function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];

      console.log("Auth Header", token);
      const decoded = verifyAccessJwt(token) as decoded;

      req.user = { id: decoded.id, ...decoded };
      if (req.user.role != "EDITOR") {
        return res.status(403).json({ message: "Permission Denied" });
      }

      next();
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        res.status(401).json({ message: "Token expired" });
      } else {
        res.status(403).json({ message: "Invalid token" });
      }
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
