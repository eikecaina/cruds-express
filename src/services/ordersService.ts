import { findAllOrders, Order } from "../models/repository/orderRepository";

export const createOrderService = (
    order: Order[],
    {
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
    }: Order
): Order => {
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

export const getOrdersService = (orders: Order[]): Order[] => {
    const dbOrders = findAllOrders();
    return [...orders, ...dbOrders];
};

export const updateOrderService = (
    orders: Order[],
    {
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
    }: Order
): Order | null => {
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

export const deleteOrderService = (orders: Order[], id: string): boolean => {
    const orderIndex = orders.findIndex((o) => o.id === id);
    if (orderIndex === -1) {
        return false;
    }
    orders.splice(orderIndex, 1);
    return true;
};
