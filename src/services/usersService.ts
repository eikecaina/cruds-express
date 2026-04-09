import { User } from "../controllers/usersController";
import {
    createUser as createUserRepository,
    findAllUsers,
    findUserById as findUserByIdRepository,
} from "../models/repository/userRepository";

type UserInput = {
    user_id: string;
    name: string;
    email: string;
    cpf: string;
};

export const createUserService = async (
    users: User[],
    { user_id, name, email, cpf }: UserInput
): Promise<User> => {
    return createUserRepository({ user_id, name, email, cpf });
};

export const deleteUserService = (users: User[], user_id: string): boolean => {
    const userIndex = users.findIndex((user) => user.user_id === user_id);

    if (userIndex === -1) {
        return false;
    }

    users.splice(userIndex, 1);
    return true;
};

export const getUsersService = async (users: User[]): Promise<User[]> => {
    return await findAllUsers();
};

export const getUserByIdService = async (
    user_id: string
): Promise<User | null> => {
    return findUserByIdRepository(user_id);
};

export const updateUserService = (
    users: User[],
    { user_id, name, email }: UserInput
): User | null => {
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
