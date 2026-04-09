"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrderById = exports.findAllOrders = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DB_PATH = path_1.default.join(__dirname, "../../data/orders.json");
const findAllOrders = () => {
    const raw = fs_1.default.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
};
exports.findAllOrders = findAllOrders;
const findOrderById = (id) => {
    const orders = (0, exports.findAllOrders)();
    return orders.find((order) => order.id === id);
};
exports.findOrderById = findOrderById;
