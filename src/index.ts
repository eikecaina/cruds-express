import express, { Application, Request, Response } from 'express';
import usersRouter from './routes/users';
import productsRouter from './routes/products';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", usersRouter);
app.use("/products", productsRouter);


app.get('/', (req: Request, res: Response) => {
  res.send('API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});