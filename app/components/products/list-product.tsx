"use client";
import { createProduct, deleteProduct, updateProduct } from "@/app/lib/action";
import Table from "../Table";

export default function ListProduct({ data, totalPage, ...props }: { data: Array<Record<string, any>>, totalPage?: number, [props: string]: any }) {
  const columns = [
    { header: 'ID', accessor: 'id', readOnly: true },
    { header: 'Name', accessor: 'name' },
    {
      header: 'Price', accessor: 'price', template: ({ data }: { data: string }) => <input type="number" name="price" className="border rounded px-3 py-2 w-full text-sm" defaultValue={data} />
    },
    { header: 'Description', accessor: 'description', render: (row: string) => <span className="truncate">{row}</span> },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <Table
        columns={columns}
        data={data}
        onAdd={createProduct}
        onEdit={updateProduct}
        onDelete={(item) => deleteProduct(item.id)}
        addButton
        {...props}
      />
    </div>
  )
}
