import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const {token, backendUrl} = useContext(AppContext)
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [discount, setDiscount] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate()


    const onSubmitHandlder = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name)
            formData.append('category', category)
            formData.append('price', price)
            formData.append('quantity', quantity)
            formData.append('discount', discount)
            formData.append('image', image)

            formData.forEach((value, key) => {
                console.log(`${key} : ${value}`);
                
            })

            const {data} = await axios.post(backendUrl + '/api/user/add-product', formData, {headers: {token} });
            if (data.success) {
                toast.success(data.message);
                setName("");
                setCategory("");
                setPrice("");
                setQuantity("");
                setDiscount("");
                setImage("")
                navigate('/product')
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
        
    }

    
    
    return (
        <>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Add Product Page</h1>
                </div>

                <form onSubmit={onSubmitHandlder} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div>
                        <label htmlFor="name" className="sr-only">Product Name</label>

                        <div className="relative">
                            <input
                                type="text"
                                name='name'
                                id='name'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter Product Name"
                            />

                        </div>
                    </div>

                    <div>
                        <label htmlFor="category" className="sr-only">Product Category</label>

                        <div className="relative">
                            <select
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                name="category"
                                id="category"
                                placeholder="Enter Product Name"
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                            >
                                <option value="Electronics">Electronics</option>
                                <option value="Plastic">Plastic</option>
                                <option value="Wood">Wood</option>
                                
                            </select>

                        </div>
                    </div>

                    <div>
                        <label htmlFor="price" className="sr-only">Product Price</label>

                        <div className="relative">
                            <input
                                type="Number"
                                name='price'
                                id='price'
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter Product Price"
                            />

                        </div>
                    </div>


                    <div>
                        <label htmlFor="quantity" className="sr-only">Product Quantity</label>

                        <div className="relative">
                            <input
                                type="Number"
                                name='quantity'
                                id='quantity'
                                onChange={(e) => setQuantity(e.target.value)}
                                value={quantity}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter Product Quantity"
                            />

                        </div>
                    </div>


                    <div>
                        <label htmlFor="discount" className="sr-only">Product Discount</label>

                        <div className="relative">
                            <input
                                type="Number"
                                name='discount'
                                id='discount'
                                onChange={(e) => setDiscount(e.target.value)}
                                value={discount}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter Product Discount"
                            />

                        </div>
                    </div>

                    <div>
                        <label htmlFor="image" className="sr-only">Product Image</label>

                        <div className="relative">
                            <input
                                type="file"
                                name='image'
                                id='image'
                                onChange={(e) => setImage(e.target.files[0])}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter Product Image"
                            />

                        </div>
                    </div>

                    <div className="flex items-center justify-center">

                        <button
                            type="submit"
                            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddProduct