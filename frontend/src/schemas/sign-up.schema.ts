import z from "zod";

export const SignUpSchema = z
  .object({
    username: z.string().min(6).max(20),
    password: z.string().min(8).max(50),
    cpassword: z.string().min(8).max(50),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Passwords don't match",
    path: ["cpassword"],
  });

export type SignUpFields = z.infer<typeof SignUpSchema>;
