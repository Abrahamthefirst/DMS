import { ValidationResult } from "joi";
import { Roles } from "../../../types/utilTypes";
export class BasicRegistrationResponseDTO {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public phone_number: string,
    public role: Roles
  ) {}
}

export class BasicLoginResponseDTO {
  constructor(
    public email: string,

    public id: number,
    public username: string,

    public email_verified: boolean,
    public picture: string | null,
    public phone_number: string,
    public role: Roles,
    public access_token: string,
    public createdAt: string,
    public updatedAt: string,
  ) {}
}
