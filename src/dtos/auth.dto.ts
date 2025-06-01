import { registrationSchema, loginSchema } from "../validations/userValidation";
import { ValidationResult } from "joi";
export class UserRegisterDTO {
  constructor(
    public username: string,
    public email: string,
    public password: string
  ) {}
  static validate(data: any): ValidationResult {
    const { error, value } = registrationSchema.validate(data);
    const dtoInstance = new UserRegisterDTO(
      value.username,
      value.email,
      value.password
    );
    return { error, value: dtoInstance };
  }
}

export class UserLoginDTO {
  constructor(public email: string, public password: string) {}

  static validate(data: any): ValidationResult {
    const { error, value } = loginSchema.validate(data);
    const dtoInstance = new UserLoginDTO(value.email, value.password);
    return { error, value: dtoInstance };
  }
}
