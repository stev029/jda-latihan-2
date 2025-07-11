import Table from "../components/Table";
import { productsDummy } from "../lib/dummy";

export default function ProductPage() {
    const columns = ["id", "Name", "Price", "Category"];

    return (
        <>
            <Table columns={columns} data={productsDummy} />
        </>
    );
}