"use client";

import { createProduct } from "@/app/lib/action";
import { useState } from "react";

interface ColProps {
  label: string;
  field: string;
}

export default function CreateForm({ columns }: { columns: ColProps[] }) {
  const [form, setForm] = useState(() => Object.fromEntries(columns.map(col => [col, ""])));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4 p-6 max-w-md mx-auto mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Create Product</h1>
      <form action={createProduct} className="space-y-4">
        {columns.map(col => (
          <div key={col.field}>
            <label htmlFor={col.field} className="block mb-1 font-medium capitalize">{col.label}</label>
            <input
              id={col.field}
              name={col.field}
              type={col.field?.toLowerCase().includes("price") ? "number" : "text"}
              value={form[col.field]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
              min={col.field?.toLowerCase().includes("price") ? 0 : undefined}
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  );
}