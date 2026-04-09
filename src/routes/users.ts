import { Router } from "express";
import {
    deleteUserController,
    getUsersController,
    getUserByIdController,
    updateUserController,
    usersStore,
} from "../controllers/usersController";
import { createUserController } from "../controllers/usersController";
import { validateCreateUser } from "../middlewares/validateCreateUser";

const usersRouter = Router();

usersRouter.post("/", validateCreateUser, createUserController);

usersRouter.get("/", getUsersController);
usersRouter.get("/:user_id", getUserByIdController);

usersRouter.put("/:id", updateUserController(usersStore));

usersRouter.delete("/:id", deleteUserController(usersStore));

export default usersRouter;
