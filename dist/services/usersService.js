"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserService = exports.getUserByIdService = exports.getUsersService = exports.deleteUserService = exports.createUserService = void 0;
const userRepository_1 = require("../models/repository/userRepository");
const createUserService = async (users, { user_id, name, email, cpf }) => {
    return (0, userRepository_1.createUser)({ user_id, name, email, cpf });
};
exports.createUserService = createUserService;
const deleteUserService = (users, user_id) => {
    const userIndex = users.findIndex((user) => user.user_id === user_id);
    if (userIndex === -1) {
        return false;
    }
    users.splice(userIndex, 1);
    return true;
};
exports.deleteUserService = deleteUserService;
const getUsersService = async (users) => {
    return await (0, userRepository_1.findAllUsers)();
};
exports.getUsersService = getUsersService;
const getUserByIdService = async (user_id) => {
    return (0, userRepository_1.findUserById)(user_id);
};
exports.getUserByIdService = getUserByIdService;
const updateUserService = (users, { user_id, name, email }) => {
    const userIndex = users.findIndex((user) => user.user_id === user_id);
    if (userIndex === -1) {
        return null;
    }
    users[userIndex] = {
        ...users[userIndex],
        name,
        email,
    };
    return users[userIndex];
};
exports.updateUserService = updateUserService;
