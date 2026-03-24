type ProductInput = {
    id: string;
    name: string;
    price: number;
}

export const createProductService = (products: ProductInput[], { id, name, price }: ProductInput): ProductInput => {
    const newProduct = { id, name, price };
    products.push(newProduct);
    return newProduct;
};

export const deleteProductService = (products: ProductInput[], id: string): boolean => {
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return false;
    }

    products.splice(productIndex, 1);
    return true;
};

export const getProductsService = (products: ProductInput[]): ProductInput[] => {
    return products;
}

export const updateProductService = (
    products: ProductInput[],
    { id, name, price }: ProductInput
): ProductInput | null => {
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return null;
    }

    const updatedProduct = { ...products[productIndex], name, price };
    products[productIndex] = updatedProduct;
    return updatedProduct;
}
