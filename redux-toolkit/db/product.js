const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 5 },
    { id: 3, name: "Product 3", price: 2 },
    { id: 4, name: "Product 4", price: 8 },
    { id: 5, name: "Product 5", price: 7 },
    { id: 6, name: "Product 6", price: 6 },
];

export const getProducts = () => products;
export const getProductById = (id) => products.find((p) => p.id == id);
