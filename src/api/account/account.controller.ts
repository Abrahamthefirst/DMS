import { Request, Response, NextFunction } from "express";
import AccountService from "../../modules/account/account.service";
class AccountController {
  constructor(private accountService: AccountService) {}
  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {};
  getUserById = async (req: Request, res: Response, next: NextFunction) => {};
  getUserDocuments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("flash");
    res.json({ message: "Cook" });
  };
  uploadDocuments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {};
}

export default AccountController;
