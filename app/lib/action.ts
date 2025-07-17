"use server";

import { addProduct, getAllProducts } from "./dummy";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function generateId() {
  const data = getAllProducts();
  const ids = data.map(product => product.id);
  return ids.length ? Math.max(...ids) + 1 : 1;
}

export async function createProduct(formData: FormData) {
  try {
    const data = {
      id: generateId(),
      name: formData.get('name'),
      price: formData.get('price'),
      category: formData.get('category')
    }
    await fetch('http://localhost:3000/api/products', { body: JSON.stringify(data), method: 'POST' })
  } catch (err) {
    console.log('Error while post data', err)
  } finally {
    revalidatePath('/products/create');
    redirect('/products');
  }
}

export async function updateProduct(formData: FormData, id: number) {
  const data = {
    name: formData.get('name'),
    price: formData.get('price'),
    category: formData.get('category'),
  }

  try {
    fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  } catch (err) {
    console.log(err)
  } finally {
    revalidatePath(`/products/${id}/edit`)
    redirect('/products')
  }
}
