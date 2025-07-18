import { prisma } from "@/app/lib/database"; // Import Prisma client
import { productSchema } from "@/app/lib/schema";
import { z } from "zod";

const PAGINATION_LIMIT = parseInt(process.env.PAGINATION_LIMIT || "6", 10);

async function GetTotalPagination(query: string) {
  const count = await prisma.product.count({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
  });
  return Math.ceil(count / PAGINATION_LIMIT);
}

export async function GET(request: Request) {
  // Handle query parameters if needed
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const skip = (page - 1) * PAGINATION_LIMIT;
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: { id: "desc" },
      skip,
      take: PAGINATION_LIMIT,
    });
    const totalPages = await GetTotalPagination(query);
    return Response.json({ products, totalPages }, {
      status: 200,
      headers: [["Content-Type", "application/json"]],
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Assuming productSchema is updated to match Prisma Product model
    console.log("Received product data:", body);
    const validatedProduct = await productSchema.parseAsync(body);

    const newProduct = await prisma.product.create({
      data: validatedProduct,
    });

    return Response.json(newProduct, {
      status: 201,
      headers: [["Content-Type", "application/json"]],
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return Response.json({ errors: error.issues }, { status: 400 });
    }
    console.error("Error creating product:", error);
    return Response.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}