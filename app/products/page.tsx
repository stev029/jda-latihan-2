import Table from "../components/Table";
import { fetchProducts } from "../lib/data";

export default async function ProductPage() {
    const data = await fetchProducts();
    return (
        <>
            <Table
                data={data} />
        </>
    );
}
