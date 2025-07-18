"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { productSchema, ProductSchema } from "./schema";
import { Product } from "../generated/prisma";
import { tr } from "zod/locales";

export async function createProduct(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    price: formData.get('price'),
    description: formData.get('description'),
  };

  try {
    const cleanedData = await productSchema.parseAsync(rawData);
    await fetch('http://localhost:3000/api/products', { body: JSON.stringify(cleanedData), method: 'POST' })
  } catch (err) {
    console.log('Error while post data', err)
    throw new Error('Failed to create product');
  } finally {
    revalidatePath('/products');
    return true;
  }
}

export async function updateProduct(formData: FormData, id: number | undefined) {
  if (!id) {
    console.error('ID is required for update');
    return false;
  }

  const data = {
    name: formData.get('name'),
    price: formData.get('price'),
    description: formData.get('description'),
  }

  try {
    const cleanedData = await productSchema.parseAsync(data);
    await fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cleanedData)
    })
  } catch (err) {
    console.log(err)
    throw new Error('Failed to update product');
  } finally {
    revalidatePath(`/products/${id}/edit`)
    return true;
  }
}

export async function deleteProduct(id: number | undefined) {
  if (!id) {
    console.error('ID is required for delete');
    return;
  }

  try {
    await fetch(`http://localhost:3000/api/products/${id}`, { method: 'DELETE' });
  } catch (err) {
    console.error('Error deleting product:', err);
  } finally {
    revalidatePath('/products');
  }
}