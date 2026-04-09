import { faker } from "@faker-js/faker";
import pool from "./connection";

const TOTAL_USERS = 100;

const ensureUsersSchema = async (): Promise<void> => {
    await pool.query(
        "CREATE TABLE IF NOT EXISTS users (" +
            "user_id VARCHAR(255) PRIMARY KEY, " +
            "name VARCHAR(255) NOT NULL, " +
            "email VARCHAR(255) NOT NULL UNIQUE, " +
            "cpf VARCHAR(255) NOT NULL UNIQUE" +
            ")"
    );
};

const seedUsers = async (): Promise<void> => {
    await ensureUsersSchema();

    const values: [string, string, string, string][] = Array.from(
        { length: TOTAL_USERS },
        () => [
            faker.string.uuid(),
            faker.person.fullName(),
            faker.internet.email(),
            faker.string.numeric(11),
        ]
    );

    let inserted = 0;

    for (const [user_id, name, email, cpf] of values) {
        await pool.query(
            "INSERT IGNORE INTO users (user_id, name, email, cpf) VALUES (?, ?, ?, ?)",
            [user_id, name, email, cpf]
        );
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
        pool.end();
    });
