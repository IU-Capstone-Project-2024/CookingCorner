import z from "zod";

export const SignInSchema = z.object({
    login: z.string().min(6).max(20),
    password: z.string().min(8).max(50),
})

export type SignInFields = z.infer<typeof SignInSchema>