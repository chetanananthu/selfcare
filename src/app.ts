import express from 'express';
import { connectDB } from './config/dbConnection';
import productRouter from './routes/product';
import { json } from 'stream/consumers';
import categoryRouter from './routes/category';
import { userRouter } from './routes/user';

connectDB();
const app = express();
app.use(express.json());  

app.use("/api", productRouter);
app.use("/api",categoryRouter);
app.use("/api/auth",userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})