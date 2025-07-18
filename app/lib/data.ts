export async function fetchProducts(query: string = "", page: number = 1) {
  const res = await fetch(`http://localhost:3000/api/products?query=${query}&page=${page}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}
