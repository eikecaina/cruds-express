import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
    createProductService,
    deleteProductService,
    getProductsService,
    updateProductService,
} from "../services/productsService";
import { Product } from "../models/repository/productRepository";

export const productsStore: Product[] = [];

export const createProductController = (req: Request, res: Response) => {
    const { name, price, category, brand, stock, voltage } = req.body;
    const id = uuidv4();
    const newProduct = createProductService(productsStore, {
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

export const getProductsController = (req: Request, res: Response) => {
    const products = getProductsService(productsStore);
    return res.json({ message: "Lista de products", products });
};

export const updateProductController =
    (products: Product[]) => (req: Request, res: Response) => {
        const id = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        const { name, price, category, brand, stock, voltage } = req.body;
        const productIndex = products.findIndex((p) => p.id === id);

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedProduct = updateProductService(products, {
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

export const deleteProductController =
    (products: Product[]) => (req: Request, res: Response) => {
        const id = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        const deleted = deleteProductService(products, id);

        if (!deleted) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.json({
            message: `Product with id ${id} deleted!`,
        });
    };
