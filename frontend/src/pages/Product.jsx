import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const Product = () => {

    const { getAllProduct, token, allProducts, backendUrl } = useContext(AppContext);

    const deleteProduct = async (productId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/user/delete-product', {productId}, {headers: {token} });
            if (data.success) {
                toast.success(data.message);
                getAllProduct();
            } else {
                toast.error(data.message);
            }
            console.log(productId);
            
        } catch (error) {
            toast.error(data.message);
        }
    }


    useEffect(() => {
        if (token) {
            getAllProduct();
        }
    }, [token]);

    return (
        <>
            <div className="md:pl-56 pt-[80px] h-full">
                <Link to={"/add-product"}
                    className="inline-block rounded border border-indigo-600 px-12 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"

                >
                    Add Product
                </Link>
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Image</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Category</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Quantity</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Price</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Discount</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">

                        {allProducts.map((item, index) => (
                            <tr key={index}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{item.name}</td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                <img
                                    className="w-8 rounded-full"
                                    src={item.image}
                                    alt=""
                                />
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.category}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.quantity}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">$ {item.price}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.discount} %</td>
                                <td className="whitespace-nowrap px-4 py-2">
                                    <Link to={`/edit-product/${item._id}`}
                                        className="inline-block rounded bg-indigo-600 mx-2 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                    >
                                        Edit
                                    </Link>
                                    
                                    <div onClick={() => deleteProduct(item._id)}
                                        className="inline-block rounded bg-red-600 px-4 mx-2 py-2 text-xs font-medium text-white hover:bg-red-700 cursor-pointer"
                                    >
                                        Delete
                                    </div>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Product