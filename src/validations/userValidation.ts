import Joi from "joi";

export const registrationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp(`^[a-zA-Z0-9]{3,30}$`)).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone_number: Joi.string(),
  role: Joi.string().valid("EDITOR", "VIEWER", "ADMIN").required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
