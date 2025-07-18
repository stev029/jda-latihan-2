
"use client";

import React, { useState, useMemo } from "react";
import AddItemForm from "./Form";
import Search from "./Search";
import Pagination from "./Pagination";
import Dialog from "./Dialog";
import WarnDialog from "./WarnDialog";
import { TableProps } from "../lib/definitions";

export default function TableComponent<T extends { [key: string]: unknown }>(props: TableProps<T>) {
    const {
        columns,
        data,
        pageSize = 10,
        searchPlaceholder = "Cari...",
        addButton = false,
        addButtonLabel = "Tambah Data",
        onEdit,
        onDelete,
        onAdd,
        action,
        footer
    } = props;
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [showAddItemForm, setShowAddItemForm] = useState(false);
    const [deleteItem, setDeleteItem] = useState<T | null>(null);
    const [editItem, setEditItem] = useState<T | null>(null);

    const resolveNestedValue = (row: T, accessor: keyof T): unknown => {
        const keys = String(accessor).split(".");
        return keys.reduce((acc, key) => (acc && (acc as any)[key] ? (acc as any)[key] : undefined), row);
    };

    const handleEditItem = (item: T, idx: number) => {
        setEditItem(item);
    };

    const filteredData = useMemo(() => {
        if (!search) return data;
        return data.filter((row) =>
            columns.some((col) =>
                String(row[col.accessor]).toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, data, columns]);

    const totalPages = Math.ceil(filteredData.length / pageSize);
    const pagedData = useMemo(
        () =>
            filteredData.slice((page - 1) * pageSize, page * pageSize),
        [filteredData, page, pageSize]
    );

    const footerForm = (
        <div className="flex gap-2 justify-end">
            <button
                type="button"
                className="px-4 py-2 rounded bg-zinc-200"
                onClick={() => {
                    setShowAddItemForm(false);
                    setEditItem(null);
                }}
            >
                Batal
            </button>
            <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
                Simpan
            </button>
        </div>
    );

    const footerTemplate = footer || (
        <Pagination totalPages={totalPages} />
    )

    return (
        <div className="space-y-4">
            { /* Search and Add Item Controls */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Search placeholder={searchPlaceholder} onChange={(e) => setSearch(e.target.value)} />
                    {addButton && (
                        <button
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm"
                            onClick={() => setShowAddItemForm(true)}
                        >
                            {addButtonLabel}
                        </button>
                    )}
                    <span className="text-sm text-gray-500">{filteredData.length} data</span>
                </div>
            </div>
            { /* Table rendering */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="bg-zinc-100">
                            {columns.map((col) => {
                                if (col.writeOnly) return null; // Skip write-only columns
                                return (
                                    <th key={String(col.accessor)} className="py-2 px-4 text-left">
                                        {col.header}
                                    </th>
                                );
                            })}
                            <th className="py-2 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="py-4 text-center text-gray-400">
                                    Tidak ada data
                                </td>
                            </tr>
                        ) : (
                            pagedData.map((row, i) => (
                                <tr key={i} className="border-b last:border-0">
                                    {columns.map((col) => {
                                        if (col.writeOnly) return null; // Skip write-only columns

                                        return (
                                            <td key={String(col.accessor)} className="py-2 px-4">
                                                {col.render
                                                    ? col.render(resolveNestedValue(row, col.accessor) as T[keyof T], row)
                                                    : resolveNestedValue(row, col.accessor) as React.ReactNode}
                                            </td>
                                        );
                                    })}
                                    <td className="py-2 px-4 flex gap-2">
                                        <button
                                            className="px-2 py-1 rounded bg-yellow-400 text-white hover:bg-yellow-500 text-xs"
                                            onClick={() => handleEditItem(row, i)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-xs"
                                            onClick={() => setDeleteItem(row)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer control */}
            {footerTemplate}

            { /* Add Item Modal */}
            <Dialog open={showAddItemForm} onClose={() => setShowAddItemForm(false)}>
                <AddItemForm
                    title="Tambah Data"
                    columns={columns}
                    action={async (formData) => {
                        const success = await onAdd?.(formData);
                        if (success) {
                            setShowAddItemForm(false);
                        }
                    }}
                >
                    {footerForm}
                </AddItemForm>

            </Dialog>
            { /* Edit Item Modal */}
            <Dialog open={!!editItem} onClose={() => setEditItem(null)}>
                <AddItemForm
                    columns={columns}
                    data={editItem || undefined}
                    action={async (formData) => {
                        const success = await onEdit?.(formData, editItem?.id as number);
                        if (success) {
                            setEditItem(null);
                        }
                    }}
                >
                    {footerForm}
                </AddItemForm>
            </Dialog>

            { /* Delete Confirmation Dialog */}
            <WarnDialog
                open={!!deleteItem}
                onCancel={() => setDeleteItem(null)}
                title="Konfirmasi Hapus"
                message={`Apakah Anda yakin ingin menghapus item dengan ID ${deleteItem?.id}?`}
                onConfirm={() => {
                    if (onDelete && deleteItem) {
                        onDelete(deleteItem);
                    }
                    setDeleteItem(null);
                }}
            />
        </div>
    );
}
