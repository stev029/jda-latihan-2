import z from "zod"

export const ProductSchema = z.object({
  id: z.coerce.number(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(1, "Price must be a positive number"),
  imageUrl: z.string().url("Invalid URL for image").optional(),
});

export const productSchema = ProductSchema.omit({ id: true }) 
