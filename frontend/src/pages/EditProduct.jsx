import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { token, backendUrl } = useContext(AppContext);
    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        quantity: '',
        discount: '',
        image: null,
    });

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-product/${productId}`, {
                headers: { token },
            });
            if (data.success) {
                setProduct(data.productData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to fetch product data');
            console.error(error);
        }
    };

    useEffect(() => {
        getProduct();
    }, [token, backendUrl, productId]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('category', product.category);
            formData.append('price', product.price);
            formData.append('quantity', product.quantity);
            formData.append('discount', product.discount);
            if (product.image) {
                formData.append('image', product.image);
            }

            const { data } = await axios.post(`${backendUrl}/api/user/update-product/${productId}`, formData, {
                headers: {
                    token,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (data.success) {
                toast.success(data.message);
                navigate('/product')
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to update product');
            console.error(error);
        }
    };

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Edit Product</h1>
            </div>

            <form onSubmit={onSubmitHandler} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                <div>
                    <label htmlFor="name" className="sr-only">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={product.name}
                        onChange={(e) => setProduct((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter Product Name"
                    />
                </div>

                <div>
                    <label htmlFor="category" className="sr-only">Product Category</label>
                    <select
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        name="category"
                        id="category"
                        onChange={(e) => setProduct((prev) => ({ ...prev, category: e.target.value }))}
                        value={product.category}
                    >
                        <option value="Electronics">Electronics</option>
                        <option value="Plastic">Plastic</option>
                        <option value="Wood">Wood</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="price" className="sr-only">Product Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={product.price}
                        onChange={(e) => setProduct((prev) => ({ ...prev, price: e.target.value }))}
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter Product Price"
                    />
                </div>

                <div>
                    <label htmlFor="quantity" className="sr-only">Product Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        value={product.quantity}
                        onChange={(e) => setProduct((prev) => ({ ...prev, quantity: e.target.value }))}
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter Product Quantity"
                    />
                </div>

                <div>
                    <label htmlFor="discount" className="sr-only">Product Discount</label>
                    <input
                        type="number"
                        name="discount"
                        id="discount"
                        value={product.discount}
                        onChange={(e) => setProduct((prev) => ({ ...prev, discount: e.target.value }))}
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter Product Discount"
                    />
                </div>

                <div>
                    <label htmlFor="image" className="sr-only">Product Image</label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={(e) =>
                            setProduct((prev) => ({ ...prev, image: e.target.files[0] }))
                        }
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    />
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                    >
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
