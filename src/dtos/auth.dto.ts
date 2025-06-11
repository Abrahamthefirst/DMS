import { registrationSchema, loginSchema } from "../validations/userValidation";
import { ValidationResult } from "joi";
import { Roles } from "../types/utilTypes";
export class UserRegisterDTO {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public phone_number: string,
    public role: Roles
  ) {}
  static validate(data: any): ValidationResult {
    const { error, value } = registrationSchema.validate(data);
    if (!error) {
      const dtoInstance = new UserRegisterDTO(
        value.username,
        value.email,
        value.password,
        value.phone_number,
        value.role
      );
      return { error, value: dtoInstance };
    }
    return { error, value };
  }
}

export class UserLoginDTO {
  constructor(public email: string, public password: string) {}

  static validate(data: any): ValidationResult {
    const { error, value } = loginSchema.validate(data);
    if (!error) {
      const dtoInstance = new UserLoginDTO(value.email, value.password);
      return { error, value: dtoInstance };
    }
    return { error, value };
  }
}
