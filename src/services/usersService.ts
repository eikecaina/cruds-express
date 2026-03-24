import { User } from '../controllers/usersController';

type UserInput = {
    id: string;
    name: string;
    email: string;
};

export const createUserService = (users: User[], { id, name, email }: UserInput): User => {
    const newUser = { id, name, email };

    users.push(newUser);
    return newUser;
};

export const deleteUserService = (users: User[], id: string): boolean => {
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return false;
    }

    users.splice(userIndex, 1);
    return true;
};

export const getUsersService = (users: User[]): User[] => {
    return users;
}

export const updateUserService = (
    users: User[],
    { id, name, email }: UserInput
): User | null => {
    const userIndex = users.findIndex((user) => user.id === id);

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
