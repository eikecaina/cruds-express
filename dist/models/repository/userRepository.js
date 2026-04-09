"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.createUser = exports.findAllUsers = void 0;
const connection_1 = __importDefault(require("../../database/connection"));
const ensureUsersSchema = async () => {
    await connection_1.default.query("CREATE TABLE IF NOT EXISTS users (" +
        "user_id VARCHAR(255) PRIMARY KEY, " +
        "name VARCHAR(255) NOT NULL, " +
        "email VARCHAR(255) NOT NULL UNIQUE, " +
        "cpf VARCHAR(14) NOT NULL UNIQUE" +
        ")");
};
const findAllUsers = async () => {
    const [rows] = await connection_1.default.query("SELECT * FROM users");
    return rows;
};
exports.findAllUsers = findAllUsers;
const createUser = async ({ user_id, name, email, cpf, }) => {
    await ensureUsersSchema();
    await connection_1.default.query("INSERT INTO users (user_id, name, email, cpf) VALUES (?, ?, ?, ?)", [user_id, name, email, cpf]);
    return { user_id, name, email, cpf };
};
exports.createUser = createUser;
const findUserById = async (user_id) => {
    const [rows] = await connection_1.default.query("SELECT user_id, name, email, cpf FROM users WHERE user_id = ? LIMIT 1", [user_id]);
    return rows.length > 0 ? rows[0] : null;
};
exports.findUserById = findUserById;
