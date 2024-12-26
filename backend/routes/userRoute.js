import express from 'express';
import { addProduct, deleteProduct, getProduct, loginUser, registerUser, updateProduct } from '../controllers/userController.js';
import authUser from "../middleware/authUser.js"
import upload from '../middleware/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

userRouter.post('/add-product', authUser, upload.single('image'), addProduct);
userRouter.get('/get-product/:id', authUser, getProduct);
userRouter.post('/update-product/:id', authUser, upload.single('image'), updateProduct);
userRouter.post('/delete-product', authUser, deleteProduct);





export default userRouter;