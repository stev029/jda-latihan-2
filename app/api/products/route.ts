import { getAllProducts } from "@/app/lib/dummy";
import { productSchema } from "@/app/lib/schema";
import { z } from "zod";

const products = getAllProducts();

export async function GET() {
  return Response.json(products, {
    status: 200,
    headers: [["Content-Type", "application/json"]],
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedProduct = productSchema.parse(body);

    const newProductId =
      products.length > 0 ? Math.max(...products.map((p: { id: number }) => p.id)) + 1 : 1;
    const newProduct = { id: newProductId, ...validatedProduct };

    products.push(newProduct);
    return Response.json(newProduct, {
      status: 201,
      headers: [["Content-Type", "application/json"]],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ errors: error.message }, { status: 400 });
    }
    return Response.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
//
// export async function PUT(request: Request) {
//   try {
//     const { id, ...body } = await request.json()
//     if (isNaN(id)) {
//       return Response.json({ message: "Invalid product ID" }, { status: 400 })
//     }
//
//     const validatedFields = productSchema.parse(body)
//
//     const productIndex = products.findIndex(p => p.id === id)
//
//     if (productIndex === -1) {
//       return Response.json({ message: "Product not found" }, { status: 404 })
//     }
//
//     products[productIndex] = { ...products[productIndex], ...validatedFields }
//
//     return Response.json(products[productIndex], {
//       status: 200,
//       headers: [["Content-Type", "application/json"]]
//     })
//   } catch (error: any) {
//     if (error instanceof z.ZodError) {
//       return Response.json({ errors: error.issues }, { status: 400 })
//     }
//     return Response.json({ message: "Internal Server Error" }, { status: 500 })
//   }
// }
