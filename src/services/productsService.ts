import {
    findAllProducts,
    Product,
} from "../models/repository/productRepository";

export const createProductService = (
    products: Product[],
    { id, name, price, category, brand, stock, voltage }: Product
): Product => {
    const newProduct = { id, name, price, category, brand, stock, voltage };
    products.push(newProduct);
    return newProduct;
};

export const deleteProductService = (
    products: Product[],
    id: string
): boolean => {
    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
        return false;
    }

    products.splice(productIndex, 1);
    return true;
};

export const getProductsService = async (
    products: Product[]
): Promise<Product[]> => {
    const dbProducts = findAllProducts();
    return [...products, ...(await dbProducts)];
};

export const updateProductService = (
    products: Product[],
    { id, name, price, category, brand, stock, voltage }: Product
): Product | null => {
    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
        return null;
    }

    const updatedProduct = {
        ...products[productIndex],
        name,
        price,
        category,
        brand,
        stock,
        voltage,
    };
    products[productIndex] = updatedProduct;
    return updatedProduct;
};
