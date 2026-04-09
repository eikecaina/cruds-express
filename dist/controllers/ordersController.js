"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderController = exports.updateOrderController = exports.getOrdersController = exports.createOrderController = exports.ordersStore = void 0;
const uuid_1 = require("uuid");
const ordersService_1 = require("../services/ordersService");
exports.ordersStore = [];
const createOrderController = (req, res) => {
    const { items, status, paymentMethod, shippingAddress, createdAt, updatedAt, totalAmount, userId, totalItems, } = req.body;
    const id = (0, uuid_1.v4)();
    const newOrder = (0, ordersService_1.createOrderService)(exports.ordersStore, {
        id,
        items,
        status,
        paymentMethod,
        shippingAddress,
        createdAt,
        updatedAt,
        totalAmount,
        userId,
        totalItems,
    });
    return res.json({
        message: `Order ${id} created!`,
        order: newOrder,
    });
};
exports.createOrderController = createOrderController;
const getOrdersController = (req, res) => {
    const orders = (0, ordersService_1.getOrdersService)(exports.ordersStore);
    return res.json({ message: "Lista de orders", orders });
};
exports.getOrdersController = getOrdersController;
const updateOrderController = (orders) => (req, res) => {
    const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
    const { items, status, paymentMethod, shippingAddress, createdAt, updatedAt, totalAmount, userId, totalItems, } = req.body;
    const productIndex = orders.findIndex((p) => p.id === id);
    if (productIndex === -1) {
        return res.status(404).json({ message: "Order not found" });
    }
    const updatedOrder = (0, ordersService_1.updateOrderService)(orders, {
        id,
        items,
        status,
        paymentMethod,
        shippingAddress,
        createdAt,
        updatedAt,
        totalAmount,
        userId,
        totalItems,
    });
    if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
    }
    res.json(updatedOrder);
};
exports.updateOrderController = updateOrderController;
const deleteOrderController = (orders) => (req, res) => {
    const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
    const deleted = (0, ordersService_1.deleteOrderService)(orders, id);
    if (!deleted) {
        return res.status(404).json({ message: "Order not found" });
    }
    return res.json({
        message: `Order with id ${id} deleted!`,
    });
};
exports.deleteOrderController = deleteOrderController;
