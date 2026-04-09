"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const products_1 = __importDefault(require("./routes/products"));
const orders_1 = __importDefault(require("./routes/orders"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/users", users_1.default);
app.use("/products", products_1.default);
app.use("/orders", orders_1.default);
app.get("/", (req, res) => {
    res.send("API is running!");
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
