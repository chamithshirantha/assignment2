import validator from "validator"
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary} from "cloudinary";
import productModel from "../models/productModel.js";

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if (!name| !email | !password) {
            return res.json({success: false, message: "Missing Details"});
        }

        if (!validator.isEmail) {
            return res.json({success: false, message: "Enter a valid email"});
        }

        if (password.length < 8) {
            return res.json({success: false, message: "Enter a valid strong password"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {name, email, password: hashedPassword};
        const newUser = new userModel(userData);
        const user = await newUser.save();
        
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET);
        res.json({success: true, token});
    } catch (error) {
        res.json({success:false, message: error.message});
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false, message: "User does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch && user.role == "Admin") {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            res.json({success:true, token});
        } else {
           return res.json({success:false, message:"Invalid credentials"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message: error.message});
    }
}


const addProduct = async (req, res) => {
    try {
        const {name, category, price, quantity, discount} = req.body;
        const imageFile = req.file;

        if (!name || !category  || !price || !quantity || !discount) {
            return res.json({sucess: false, message: "Missing Details"});
        }
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'});
        const imageUrl = imageUpload.secure_url;

        const productData = {
            name,
            category,
            price,
            quantity,
            discount,
            image: imageUrl,
        }

        const newProduct = new productModel(productData);
        const product = await newProduct.save();

        res.json({success: true, product});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

const getProduct= async (req, res) => {
    try {
        const productData = await productModel.findById(req.params.id);
        res.json({success: true, productData});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const updateProduct = async (req, res) => {
    try {
        const {name, category, price, quantity, discount} = req.body;
        const imageFile = req.file;

        const productData = await productModel.findById(req.params.id);

        if (!productData) {
            return res.json({sucess: false, message: "Product Not Found !"});
        }

        if (!name || !category  || !price || !quantity || !discount) {
            return res.json({sucess: false, message: "Missing Details"});
        }

        await productModel.findByIdAndUpdate(productData._id, {name, category, price, quantity, discount})

        if (imageFile) {
            const imageUpload  = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'});
            const imageURL = imageUpload.secure_url;
            await productModel.findByIdAndUpdate(productData._id, {image: imageURL})
        }

        return res.json({success: true, message: "Product Updated !"});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}


const deleteProduct = async (req, res) => {
   try {
        const {productId} = req.body;
        const productData = await productModel.findById(productId);
        if (!productData) {
            return res.json({sucess: false, message: "Product Not Found !"});
        }
        await productModel.findByIdAndUpdate(productId, {active: false});
        return res.json({success: true, message: "Product deleted !"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}



export {
    registerUser, 
    loginUser, 
    addProduct, 
    getProduct,
    updateProduct,
    deleteProduct
}