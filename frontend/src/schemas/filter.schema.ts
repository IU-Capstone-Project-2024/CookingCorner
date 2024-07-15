import z from "zod";

export const ProfileEditSchema = z.object({
  category_name: z.string(),
  is_favourite: z.string().optional().or(z.literal("")),
  ascending_order: z.string()
});