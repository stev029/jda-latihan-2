import { getAllProducts } from "@/app/lib/dummy";
import { productSchema } from "@/app/lib/schema";
import { z } from "zod";

const products = getAllProducts();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return Response.json({ message: "Invalid product ID" }, { status: 400 });
  }

  const productIndex = products.findIndex(
    (p: { id: number }) => p.id === parsedId,
  );
  if (productIndex === -1) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }

  return Response.json(products[productIndex], { status: 200 });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const parseId = parseInt(id);

    if (isNaN(parseId)) {
      return Response.json({ message: "Invalid product ID" }, { status: 400 });
    }

    const body = await request.json();
    const validatedFields = productSchema.parse(body);

    const productIndex = products.findIndex(
      (p: { id: number }) => p.id === parseId,
    );

    if (productIndex === -1) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    products[productIndex] = { ...products[productIndex], ...validatedFields };

    return Response.json(products[productIndex], {
      status: 200,
      headers: [["Content-Type", "application/json"]],
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return Response.json({ errors: error.issues }, { status: 400 });
    }
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return Response.json({ message: "Invalid product ID" }, { status: 400 });
    }

    const productIndex = products.findIndex(
      (p: { id: number }) => p.id === parsedId,
    );

    if (productIndex === -1) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    products.splice(productIndex, 1); // Remove the product from the array

    return new Response(null, { status: 204 }); // 204 No Content for successful deletion
  } catch (error: any) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
