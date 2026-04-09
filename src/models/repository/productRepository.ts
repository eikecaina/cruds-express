import pool from "../../database/connection";

export type Product = {
    id: string;
    name: string;
    price: number;
    category: string;
    brand: string;
    stock: number;
    voltage: string;
};

export const findAllProducts = async (): Promise<Product[]> => {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows as Product[];
};

/*
export const findProductById = (id: string): Product | undefined => {
    const products = findAllProducts();
    return products.find(p => p.id === id);
}
*/
