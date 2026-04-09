"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.getUsersController = exports.getUserByIdController = exports.createUserController = exports.usersStore = void 0;
const usersService_1 = require("../services/usersService");
const uuid_1 = require("uuid");
exports.usersStore = [];
const createUserController = async (req, res) => {
    const { name, email, cpf } = req.body;
    const user_id = (0, uuid_1.v4)();
    const newUser = await (0, usersService_1.createUserService)(exports.usersStore, {
        user_id,
        name,
        email,
        cpf,
    });
    return res.json({
        message: `User ${name} with email ${email} created!`,
        user: newUser,
    });
};
exports.createUserController = createUserController;
const getUserByIdController = async (req, res) => {
    const user_id = Array.isArray(req.params.user_id)
        ? req.params.user_id[0]
        : req.params.user_id;
    const user = await (0, usersService_1.getUserByIdService)(user_id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User encontrado", user });
};
exports.getUserByIdController = getUserByIdController;
const getUsersController = async (req, res) => {
    const users = await (0, usersService_1.getUsersService)(exports.usersStore);
    return res.json({ message: "Lista de users", users });
};
exports.getUsersController = getUsersController;
const updateUserController = (users) => (req, res) => {
    const user_id = Array.isArray(req.params.user_id)
        ? req.params.user_id[0]
        : req.params.user_id;
    const { name, email, cpf } = req.body;
    const updatedUser = (0, usersService_1.updateUserService)(users, {
        user_id,
        name,
        email,
        cpf,
    });
    if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.json({
        message: `User ${name} with email ${email} updated!`,
        user: updatedUser,
    });
};
exports.updateUserController = updateUserController;
const deleteUserController = (users) => (req, res) => {
    const user_id = Array.isArray(req.params.user_id)
        ? req.params.user_id[0]
        : req.params.user_id;
    const deleted = (0, usersService_1.deleteUserService)(users, user_id);
    if (!deleted) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.json({
        message: `User with id ${user_id} deleted!`,
    });
};
exports.deleteUserController = deleteUserController;
