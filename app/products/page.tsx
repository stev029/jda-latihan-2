import Pagination from "../components/Pagination";
import ListProduct from "../components/products/list-product";
import Table from "../components/Table";
import { fetchProducts } from "../lib/data";

export default async function ProductPage({ searchParams }: { searchParams: Promise<{ query?: string, page?: number }> }) {
    const { query = '', page = 1 } = await searchParams;
    const { products, totalPages } = await fetchProducts(query, page);

    return (
        <>
            <ListProduct data={products} footer={<Pagination totalPages={totalPages} />} />
        </>
    );
}
