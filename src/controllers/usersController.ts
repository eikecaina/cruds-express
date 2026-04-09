import { Request, Response } from "express";
import {
    createUserService,
    deleteUserService,
    getUsersService,
    getUserByIdService,
    updateUserService,
} from "../services/usersService";
import { v4 as uuidv4 } from "uuid";

export type User = {
    user_id: string;
    name: string;
    email: string;
    cpf: string;
};

export const usersStore: User[] = [];

export const createUserController = async (req: Request, res: Response) => {
    const { name, email, cpf } = req.body;
    const user_id = uuidv4();
    const newUser = await createUserService(usersStore, {
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

export const getUserByIdController = async (req: Request, res: Response) => {
    const user_id = Array.isArray(req.params.user_id)
        ? req.params.user_id[0]
        : req.params.user_id;

    const user = await getUserByIdService(user_id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "User encontrado", user });
};

export const getUsersController = async (req: Request, res: Response) => {
    const users = await getUsersService(usersStore);
    return res.json({ message: "Lista de users", users });
};

export const updateUserController =
    (users: User[]) => (req: Request, res: Response) => {
        const user_id = Array.isArray(req.params.user_id)
            ? req.params.user_id[0]
            : req.params.user_id;
        const { name, email, cpf } = req.body;

        const updatedUser = updateUserService(users, {
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

export const deleteUserController =
    (users: User[]) => (req: Request, res: Response) => {
        const user_id = Array.isArray(req.params.user_id)
            ? req.params.user_id[0]
            : req.params.user_id;
        const deleted = deleteUserService(users, user_id);

        if (!deleted) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({
            message: `User with id ${user_id} deleted!`,
        });
    };
