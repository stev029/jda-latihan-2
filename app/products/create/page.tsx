'use client';

import { useState } from "react";
import CreateForm from "@/app/components/products/create-form";

export default function ProductCreate() {
  const columns = [
    { label: 'Name', field: 'name' },
    { label: 'Price', field: 'price' },
    { label: 'Description', field: 'description' },
    {
      label: 'Image', field: 'image', render: (row: string) => (
        <input className="border px-3 py-2 rounded" type="file" name="image" value={row} />
      )
    },
  ];
  return (
    <CreateForm columns={columns} />
  )
}
