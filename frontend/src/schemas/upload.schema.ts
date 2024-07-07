import z from "zod";

export const UploadSchema = z.object({
  link: z.string().min(10)
});

export type UploadFields = z.infer<typeof UploadSchema>;
