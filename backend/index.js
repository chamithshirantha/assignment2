import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoute.js';
import connectCloudinary from './config/cloudinary.js';


const app = express();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());


app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send('api work');
})

app.listen(port, ()=> {
    console.log("server runnning", port);
    
})

