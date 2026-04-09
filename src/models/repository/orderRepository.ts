import fs from "fs";
import path from "path";

export type OrderStatus =
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

export type PaymentMethod = "pix" | "credit_card" | "debit_card" | "boleto";

export type OrderItem = {
    productId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
};

export type ShippingAddress = {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
};

export type Order = {
    id: string;
    userId: string;
    items: OrderItem[];
    totalItems: number;
    totalAmount: number;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    shippingAddress: ShippingAddress;
    createdAt: string;
    updatedAt: string;
};

const DB_PATH = path.join(__dirname, "../../data/orders.json");

export const findAllOrders = (): Order[] => {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw) as Order[];
};

export const findOrderById = (id: string): Order | undefined => {
    const orders = findAllOrders();
    return orders.find((order) => order.id === id);
};
