interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
}

declare global {
    // eslint-disable-next-line no-var
    let products: Product[];
}

if (!globalThis.products) {
    globalThis.products = [
        { id: 1, name: "Product 1", price: 10, category: "Category A" },
        { id: 2, name: "Product 2", price: 20, category: "Category B" },
        { id: 3, name: "Product 3", price: 30, category: "Category C" },
        { id: 4, name: "Product 4", price: 40, category: "Category D" },
        { id: 5, name: "Product 5", price: 50, category: "Category E" },
        { id: 6, name: "Product 6", price: 60, category: "Category F" },
        { id: 7, name: "Product 7", price: 70, category: "Category G" },
        { id: 8, name: "Product 8", price: 80, category: "Category H" },
    ];
}

export function getProductById(id: number) {
    return globalThis.products.find((product) => product.id === id);
}

export function getAllProducts() {
    return globalThis.products;
}
