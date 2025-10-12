import express from 'express';
import { connectDB } from './config/dbConnection';
import productRouter from './routes/product';
import { json } from 'stream/consumers';

connectDB();
const app=express();
app.use(express.json());

app.use("/api",productRouter)

const PORT= process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})