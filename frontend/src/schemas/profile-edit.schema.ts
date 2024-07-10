import z from "zod";

export const ProfileEditSchema = z.object({
  username: z.string().min(6).max(20),
  name: z.string().min(2).max(20).optional().or(z.literal("")),
  surname: z.string().min(2).max(20).optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  cooking_experience: z.string().min(1).max(3).optional().or(z.literal("")),
  image_path: z.string().optional()
});