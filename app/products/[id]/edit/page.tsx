import { EditProductForm } from "@/app/components/products/edit-form";
import { Product } from "@/app/lib/definitions";

async function fetchProductById(id: string): Promise<Product | null> {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error("Failed to fetch product");
  }
  return res.json();
}

export default async function UpdateProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <UpdateProduct id={id} />
    </div>
  );
}

export async function UpdateProduct({ id }: { id: string }) {
  const product = await fetchProductById(id);
  console.log(product);

  if (!product) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Update Product</h1>
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Update Product</h1>
      <EditProductForm product={product} />
    </>
  );
}
