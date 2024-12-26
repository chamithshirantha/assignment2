import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    discount: {type: Number, required: true},
    image: {type: String, required: true},
    active: {type: Boolean, default: true}
}, {timestamps:true});

const productModel = mongoose.model.product || mongoose.model('product', productSchema);
export default productModel;