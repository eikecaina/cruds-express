"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET todos os produtos
router.get('/', (req, res) => {
    res.json({ message: 'Lista de produtos', products: [] });
});
// GET produto por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Produto ${id}`, product: { id, name: 'Product Name' } });
});
// POST criar novo produto
router.post('/', (req, res) => {
    const { name, price } = req.body;
    res.status(201).json({ message: 'Produto criado', product: { id: 1, name, price } });
});
exports.default = router;
