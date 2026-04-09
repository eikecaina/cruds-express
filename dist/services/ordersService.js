"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderService = exports.updateOrderService = exports.getOrdersService = exports.createOrderService = void 0;
const orderRepository_1 = require("../models/repository/orderRepository");
const createOrderService = (order, { id, items, status, paymentMethod, shippingAddress, createdAt, updatedAt, totalAmount, userId, totalItems, }) => {
    const newOrder = {
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
    };
    order.push(newOrder);
    return newOrder;
};
exports.createOrderService = createOrderService;
const getOrdersService = (orders) => {
    const dbOrders = (0, orderRepository_1.findAllOrders)();
    return [...orders, ...dbOrders];
};
exports.getOrdersService = getOrdersService;
const updateOrderService = (orders, { id, items, status, paymentMethod, shippingAddress, createdAt, updatedAt, totalAmount, userId, totalItems, }) => {
    const orderIndex = orders.findIndex((o) => o.id === id);
    if (orderIndex === -1) {
        return null;
    }
    const updatedOrder = {
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
    };
    orders[orderIndex] = updatedOrder;
    return updatedOrder;
};
exports.updateOrderService = updateOrderService;
const deleteOrderService = (orders, id) => {
    const orderIndex = orders.findIndex((o) => o.id === id);
    if (orderIndex === -1) {
        return false;
    }
    orders.splice(orderIndex, 1);
    return true;
};
exports.deleteOrderService = deleteOrderService;
