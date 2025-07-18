import { prisma } from "@/app/lib/database";
import { getAllProducts } from "@/app/lib/dummy";
import { productSchema } from "@/app/lib/schema";
import { z } from "zod";

const products = getAllProducts();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });
  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }

  return Response.json(product, { status: 200 });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const body = await request.json();
    const validatedFields = await productSchema.parseAsync(body);

    const productIndex = await prisma.product.findFirst({
      where: { id },
    });

    if (!productIndex) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: validatedFields,
    });

    return Response.json(updatedProduct, {
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

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return new Response(null, { status: 204 }); // 204 No Content for successful deletion
  } catch (error: any) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
