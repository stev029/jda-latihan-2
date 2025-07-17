import { useState } from "react";
import CreateForm from "@/app/components/products/create-form";

export default function ProductCreate() {
  const columns = [
    {label: 'Name', field: 'name'},
    {label: 'Price', field: 'price'},
    {label: 'Category', field: 'category'},
  ];
  return (
    <CreateForm columns={columns}/>
  )
}
