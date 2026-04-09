"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductController = exports.updateProductController = exports.getProductsController = exports.createProductController = exports.productsStore = void 0;
const uuid_1 = require("uuid");
const productsService_1 = require("../services/productsService");
exports.productsStore = [];
const createProductController = (req, res) => {
    const { name, price, category, brand, stock, voltage } = req.body;
    const id = (0, uuid_1.v4)();
    const newProduct = (0, productsService_1.createProductService)(exports.productsStore, {
        id,
        name,
        price,
        category,
        brand,
        stock,
        voltage,
    });
    return res.json({
        message: `Product ${name} with price ${price} created!`,
        product: newProduct,
    });
};
exports.createProductController = createProductController;
const getProductsController = (req, res) => {
    const products = (0, productsService_1.getProductsService)(exports.productsStore);
    return res.json({ message: "Lista de products", products });
};
exports.getProductsController = getProductsController;
const updateProductController = (products) => (req, res) => {
    const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
    const { name, price, category, brand, stock, voltage } = req.body;
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = (0, productsService_1.updateProductService)(products, {
        id,
        name,
        price,
        category,
        brand,
        stock,
        voltage,
    });
    if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
};
exports.updateProductController = updateProductController;
const deleteProductController = (products) => (req, res) => {
    const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
    const deleted = (0, productsService_1.deleteProductService)(products, id);
    if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
    }
    return res.json({
        message: `Product with id ${id} deleted!`,
    });
};
exports.deleteProductController = deleteProductController;
