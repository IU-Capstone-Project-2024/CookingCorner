import z from "zod";

export const UploadSchema = z.object({
  link: z.string()
});

export type UploadFields = z.infer<typeof UploadSchema>;
