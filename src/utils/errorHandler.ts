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
  let message = "Internal server error";
  let statusCode = 500;
  if (res.statusCode === 404) {
    message = "Not found";
  }

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
