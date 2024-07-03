import z from "zod";

export const RecipeSchema = z.object({
  title: z
    .string()
    .min(1, { message: "You need to name your recipe!" })
    .max(30),
  description: z.string().min(0),
  category: z.string().min(0),
  tag: z.string().min(0),
  preparationTime: z.string().min(0),
  cookingTime: z.string().min(0),
  restTime: z.string().min(0),
  totalTime: z.string().min(0),
  portions: z.string().min(0),
  ingredients: z.string().min(0),
  cookingSteps: z.string().min(0),
  comments: z.string().min(0),
  nutritionalValue: z.string().min(0),
  proteinsValue: z.string().min(0),
  fatsValue: z.string().min(0),
  carbohydratesValue: z.string().min(0),
  dishes: z.string().min(0),
  videoLink: z.string().min(0),
  source: z.string().min(0),
});

export type RecipeSchemaFields = z.infer<typeof RecipeSchema>;
