import { Router } from "express";
import { createProductController, deleteProductController, getProductsController, productsStore, updateProductController } from "../controllers/productsController";

const productsRouter = Router();

productsRouter.post('/', createProductController);

productsRouter.get('/', getProductsController);

productsRouter.put('/:id', updateProductController(productsStore));

productsRouter.delete('/:id', deleteProductController(productsStore));

export default productsRouter;