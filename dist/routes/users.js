"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET todos os usuários
router.get('/', (req, res) => {
    res.json({ message: 'Lista de usuários', users: [] });
});
// GET usuário por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Usuário ${id}`, user: { id, name: 'John Doe' } });
});
// POST criar novo usuário
router.post('/', (req, res) => {
    const { name, email } = req.body;
    res.status(201).json({ message: 'Usuário criado', user: { id: 1, name, email } });
});
// PUT atualizar usuário
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Usuário ${id} atualizado` });
});
// DELETE remover usuário
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Usuário ${id} removido` });
});
exports.default = router;
