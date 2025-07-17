import z from "zod"

export const ProductSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  price: z.coerce.number(),
  category: z.string()
})

export const productSchema = ProductSchema.omit({ id: true }) 
