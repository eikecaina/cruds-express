"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const connection_1 = __importDefault(require("./connection"));
const TOTAL_USERS = 100;
const ensureUsersSchema = async () => {
    await connection_1.default.query("CREATE TABLE IF NOT EXISTS users (" +
        "user_id VARCHAR(255) PRIMARY KEY, " +
        "name VARCHAR(255) NOT NULL, " +
        "email VARCHAR(255) NOT NULL UNIQUE, " +
        "cpf VARCHAR(255) NOT NULL UNIQUE" +
        ")");
};
const seedUsers = async () => {
    await ensureUsersSchema();
    const values = Array.from({ length: TOTAL_USERS }, () => [
        faker_1.faker.string.uuid(),
        faker_1.faker.person.fullName(),
        faker_1.faker.internet.email(),
        faker_1.faker.string.numeric(11),
    ]);
    let inserted = 0;
    for (const [user_id, name, email] of values) {
        await connection_1.default.query("INSERT IGNORE INTO users (user_id, name, email) VALUES (?, ?, ?)", [user_id, name, email]);
        inserted++;
    }
    console.log(`Seed concluído: ${inserted} usuários inseridos.`);
};
seedUsers()
    .catch((err) => {
    console.error("Erro ao executar seed:", err);
    process.exit(1);
})
    .finally(() => {
    connection_1.default.end();
});
