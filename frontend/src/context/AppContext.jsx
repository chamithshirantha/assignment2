import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [allProducts, setAllProducts] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
   
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    
    const getAllProduct = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/get-products', {headers: {token} });
            if (data.success) {
                setAllProducts(data.allProduct);
                
            } else {
                toast.error(error.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const value = {
        token,
        setToken,
        backendUrl,
        getAllProduct,
        allProducts
      
    }

    useEffect(() => {
        if (token) {
            getAllProduct();
        }
    }, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}


export default AppContextProvider;