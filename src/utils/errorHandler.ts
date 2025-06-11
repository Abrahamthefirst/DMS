import { NextFunction, Request, Response } from "express";
import {
  ConflictError,
  NotFoundError,
  BadRequestError,
  GoneError,
} from "./error";
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal server error";

  if (
    err instanceof ConflictError ||
    err instanceof NotFoundError ||
    err instanceof BadRequestError ||
    err instanceof GoneError
  ) {
    statusCode = err.status;
    message = err.message;
  }

  res.status(statusCode).json({ message });
};
