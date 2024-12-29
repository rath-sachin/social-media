import { z } from "zod";

export const UsernameSchema = z.string().refine((arg) => {
  const allowedCharacters = "_abcdefghijklmnopqrstuvwxyz1234567890";
  arg = arg.toLowerCase();
  for (let i = 0; i < arg.length; i++) {
    if (!allowedCharacters.includes(arg[i])) {
      return false;
    }
    return true;
  }
});
export const SignupSchema = z.strictObject({
  username: UsernameSchema,
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const SigninSchema = z.object({
  username: UsernameSchema,
  password: z.string(),
});
