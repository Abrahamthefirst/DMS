import * as z from "zod/v4";

export class BasicRegistrationRequestDTO {
  constructor(
    public username: string,
    public password: string,
    public email: string,
    public phone_number: string,
    public role: "ADMIN" | "EDITOR" | "VIEWER"
  ) {}
  static validate = (data: any) => {
    const schema = z.strictObject({
      username: z.string("Please enter a valid username").min(3).max(30),
      password: z
        .string("Input a password")
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, {
          message: "Password must contain at least one uppercase letter",
        })
        .regex(/[a-z]/, {
          message: "Password must contain at least one lowercase letter",
        })
        .regex(/[0-9]/, {
          message: "Password must contain at least one number",
        }),
      email: z.email("Please enter a valid email address."),
      phone_number: z.string("Please enter a valid phone number"),
      role: z.literal(["EDITOR", "VIEWER", "ADMIN"]),
    });
    const result = schema.safeParse(data);
    if (result.success) {
      return { error: null, value: result.data };
    }

    const errMsg = result.error.issues.map((response) => {
      return response.message;
    });

    return { value: null, errMsg };
  };
  // public get age() {
  //   return this.age;
  // }

  // public set age(theAge: number) {
  //   if (theAge <= 0 || theAge >= 200) {
  //     throw new Error('The age is invalid');
  //   }
  //   this.age = theAge;
  // }
}

export class BasicLoginRequestDTO {
  constructor(public email: string, public password: string) {}

  static validate = (data: any) => {
    const Account = z
      .strictObject({
        email: z.email("Email is required"),
        password: z.string("Password is required"),
      })
      .required();

    const result = Account.safeParse(data);
    if (result.success) {
      return { error: null, value: result.data };
    }

    const errMsg = result.error.issues.map((response) => {
      return response.message;
    });

    return { value: null, errMsg };
  };
}

