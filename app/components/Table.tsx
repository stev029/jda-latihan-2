"use client";

import Link from "next/link";
import { JSX } from "react";
import { useRouter } from "next/navigation";

interface ColumnProps {
    header: string;
    accessor: string;
    render?: (data: any) => JSX.Element;
}

interface TableProps {
    data: Array<Record<string, any>>;
}

export default function Table({ data }: TableProps) {
    const router = useRouter();

    const resolveNestedValue = (row: any, accessor: string): unknown => {
        const keys = String(accessor).split(".");
        return keys.reduce((acc, key) => (acc && (acc as any)[key] ? (acc as any)[key] : undefined), row);
    };

    const columns: ColumnProps[] = [
        { header: "Product ID", accessor: "id" },
        { header: "Product Name", accessor: "name" },
        { header: "Price", accessor: "price", render: (row) => <span>${row}</span> },
        { header: "Category", accessor: "category" }
    ]

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const res = await fetch(`http://localhost:3000/api/products/${id}`, {
                    method: 'DELETE',
                });

                if (!res.ok) {
                    throw new Error('Failed to delete product');
                }

                alert('Product deleted successfully!');
                router.refresh(); // Refresh the current route to refetch data
            } catch (error: any) {
                alert(`Error deleting product: ${error.message}`);
            }
        }
    };

    return (
        <div>
            <div className="mb-4">
                <Link
                    className="mb-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    href="/products/create"
                >
                    Add Product
                </Link>
            </div>
            <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead className="bg-gray-100">
                    <tr>
                        {columns.map((col) => (
                            <th key={String(col.accessor)} className="py-2 px-4 text-left">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                            {columns.map((column, colIndex) => (
                                <td key={colIndex} className="border border-gray-300 px-4 py-2">
                                    {column.render
                                        ? column.render(resolveNestedValue(row, column.accessor))
                                        : resolveNestedValue(row, column.accessor) as React.ReactNode}
                                </td>
                            ))}
                            <td className="border border-gray-300 px-4 py-2 flex gap-3 justify-center">
                                <div className="mt-1 bg-sky-500 px-3 py-1 rounded">
                                    <Link href={`/products/${row.id}/edit`} className="text-white">
                                        Edit
                                    </Link>
                                </div>
                                <div className="mt-1 bg-rose-500 px-3 py-1 rounded">
                                    <button
                                        onClick={() => handleDelete(row.id)}
                                        className="text-white"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
