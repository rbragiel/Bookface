import * as z from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(50, "Title length must be less than 50 characters."),
  content: z
    .string()
    .min(1, "Content is required.")
    .max(150, "Content length must be less than 150 characters."),
});
