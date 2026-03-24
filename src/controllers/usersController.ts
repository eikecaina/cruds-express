import { Request, Response } from 'express';
import { createUserService, deleteUserService, getUsersService, updateUserService } from '../services/usersService';
import { v4 as uuidv4 } from 'uuid';

export type User = {
    id: string;
    name: string;
    email: string;
};

export const usersStore: User[] = [];

export const createUserController = (req: Request, res: Response) => {
    const { name, email } = req.body;
    const id = uuidv4();
    const newUser = createUserService(usersStore, { id, name, email });

    return res.json({
        message: `User ${name} with email ${email} created!`,
        user: newUser,
    });
};

export const getUsersController = (req: Request, res: Response) => {
    const users = getUsersService(usersStore);
    return res.json({ message: 'Lista de users', users });
};

export const updateUserController =
    (users: User[]) => (req: Request, res: Response) => {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const { name, email } = req.body;

        const updatedUser = updateUserService(users, { id, name, email });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json({
            message: `User ${name} with email ${email} updated!`,
            user: updatedUser,
        });
    };

export const deleteUserController = (users: User[]) => (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const deleted = deleteUserService(users, id);

    if (!deleted) {
        return res.status(404).json({ message: 'User not found' });
    }

    return res.json({
        message: `User with id ${id} deleted!`,
    });
}

