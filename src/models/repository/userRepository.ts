import pool from "../../database/connection";

export type User = {
    user_id: string;
    name: string;
    email: string;
    cpf: string;
};

const ensureUsersSchema = async (): Promise<void> => {
    await pool.query(
        "CREATE TABLE IF NOT EXISTS users (" +
            "user_id VARCHAR(255) PRIMARY KEY, " +
            "name VARCHAR(255) NOT NULL, " +
            "email VARCHAR(255) NOT NULL UNIQUE, " +
            "cpf VARCHAR(14) NOT NULL UNIQUE" +
            ")"
    );
};

export const findAllUsers = async (): Promise<User[]> => {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows as User[];
};

export const createUser = async ({
    user_id,
    name,
    email,
    cpf,
}: User): Promise<User> => {
    await ensureUsersSchema();

    await pool.query(
        "INSERT INTO users (user_id, name, email, cpf) VALUES (?, ?, ?, ?)",
        [user_id, name, email, cpf]
    );

    return { user_id, name, email, cpf };
};

export const findUserById = async (user_id: string): Promise<User | null> => {
    const [rows] = await pool.query<any[]>(
        "SELECT user_id, name, email, cpf FROM users WHERE user_id = ? LIMIT 1",
        [user_id]
    );
    return rows.length > 0 ? (rows[0] as User) : null;
};
