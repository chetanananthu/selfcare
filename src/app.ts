import express from 'express';
import { connectDB } from './config/dbConnection';

connectDB();
const app=express();

const PORT= process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})