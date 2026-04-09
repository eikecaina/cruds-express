"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllProducts = void 0;
const connection_1 = __importDefault(require("../../database/connection"));
const findAllProducts = async () => {
    const [rows] = await connection_1.default.query("SELECT * FROM products");
    return rows;
};
exports.findAllProducts = findAllProducts;
/*
export const findProductById = (id: string): Product | undefined => {
    const products = findAllProducts();
    return products.find(p => p.id === id);
}
*/
