import z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"]


export const ProfileEditSchema = z.object({
  username: z.string().min(6).max(20),
  name: z.string().min(2).max(20).optional().or(z.literal("")),
  surname: z.string().min(2).max(20).optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  cooking_experience: z.string().min(1).max(3).optional().or(z.literal("")),
  image_path: z.instanceof(FileList).optional()
    .refine((file) => file?.length == 1 ? file[0].size <= MAX_FILE_SIZE ? true : false : true)
    .refine((file) => file?.length == 1 ? ACCEPTED_IMAGE_TYPES.includes(file[0].type) ? true : false: true),
});