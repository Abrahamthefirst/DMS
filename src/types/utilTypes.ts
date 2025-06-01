export type ValidationResult<T> = { error: string } | { data: T };

export type resetPasswordType = {
  email: string;
  oldPassword: string;
  newPassword: string;
};
