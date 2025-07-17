
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { productSchema } from "@/app/lib/schema"
import { Product } from "@/app/lib/definitions"
import { z } from "zod"

interface EditProductFormProps {
    product: Product;
}

export function EditProductForm({ product }: EditProductFormProps) {
    const router = useRouter();
    const productId = product.id;

    const [formData, setFormData] = useState({
        name: product?.name || '',
        price: product?.price || 0,
        category: product?.category || '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            // Client-side validation
            productSchema.parse(formData);

            const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                if (res.status === 400 && errorData.errors) {
                    const fieldErrors: Record<string, string> = {};
                    errorData.errors.forEach((err: any) => {
                        if (err.path && err.path.length > 0) {
                            fieldErrors[err.path[0]] = err.message;
                        }
                    });
                    setErrors(fieldErrors);
                } else {
                    throw new Error(errorData.message || 'Failed to update product');
                }
            } else {
                alert('Product updated successfully!');
                router.push('/products'); // Redirect to products list page
            }
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                error.issues.forEach(issue => {
                    if (issue.path && issue.path.length > 0) {
                        fieldErrors[issue.path[0]] = issue.message;
                    }
                });
                setErrors(fieldErrors);
            } else {
                setErrors({ general: error.message || 'An unexpected error occurred.' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>
            {errors.general && <p className="text-red-500 text-sm mt-1">{errors.general}</p>}
            <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            >
                {loading ? 'Updating...' : 'Update Product'}
            </button>
        </form>
    );
}

