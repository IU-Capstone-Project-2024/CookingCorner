import z from "zod";

const IngredientsSchema = z.object({
  title: z.string().min(1),
  portion: z.string().min(1),
})

const StepSchema = z.object({
  description: z.string().min(1),
})

export const RecipeSchema = z.object({
  // icon_path: z.instanceof(FileList)
  //   .refine((file) => file[0].size <= MAX_FILE_SIZE)
  //   .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file[0].type)),
  name: 
    z.string({message: "You need to name your recipe!"})
    .min(1, {message: "You need to name your recipe!"})
    .max(50),
  description: z.string().min(1),
  category_name: z.string().min(0),
  preparing_time: z.string().min(0).optional().or(z.literal(undefined)),
  cooking_time: z.string().min(0).optional().or(z.literal(undefined)),
  waiting_time: z.string().min(0).optional().or(z.literal(undefined)),
  portions: z.string().min(0).optional().or(z.literal(undefined)),
  ingredients: z.array(IngredientsSchema).optional().or(z.literal(undefined)),
  steps: z.array(StepSchema).optional().or(z.literal(undefined)),
  comments: z.string().min(0).optional().or(z.literal(undefined)),
  nutritional_value: z.string().min(0).optional().or(z.literal(undefined)),
  proteins_value: z.string().min(0).optional().or(z.literal(undefined)),
  fats_value: z.string().min(0).optional().or(z.literal(undefined)),
  carbohydrates_value: z.string().min(0).optional().or(z.literal(undefined)),
  dishes: z.string().min(0).optional().or(z.literal(undefined)),
  video_link: z.string().min(0).optional().or(z.literal(undefined)),
  source: z.string().min(0).optional().or(z.literal(undefined)),
});

export type RecipeSchemaFields = z.infer<typeof RecipeSchema>;
