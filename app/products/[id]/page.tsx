import Table from "@/app/components/Table";
import { productsDummy } from "@/app/lib/dummy";
import { notFound } from "next/navigation";
import React from "react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const columns = ["id", "Name", "Price", "Category"];
    const data = productsDummy.filter(product => product.id.toString() === id);

    if (data.length === 0) {
        notFound();
    }

    return (
        <div className="flex flex-col items-center h-screen">
            <h1 className="text-2xl font-bold">Product Detail Page</h1>
            <Table columns={columns} data={data} />
        </div>
    );
}