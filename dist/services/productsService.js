"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductService = exports.getProductsService = exports.deleteProductService = exports.createProductService = void 0;
const productRepository_1 = require("../models/repository/productRepository");
const createProductService = (products, { id, name, price, category, brand, stock, voltage }) => {
    const newProduct = { id, name, price, category, brand, stock, voltage };
    products.push(newProduct);
    return newProduct;
};
exports.createProductService = createProductService;
const deleteProductService = (products, id) => {
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
        return false;
    }
    products.splice(productIndex, 1);
    return true;
};
exports.deleteProductService = deleteProductService;
const getProductsService = async (products) => {
    const dbProducts = (0, productRepository_1.findAllProducts)();
    return [...products, ...(await dbProducts)];
};
exports.getProductsService = getProductsService;
const updateProductService = (products, { id, name, price, category, brand, stock, voltage }) => {
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
exports.updateProductService = updateProductService;
