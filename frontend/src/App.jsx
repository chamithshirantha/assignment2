import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Product from "./pages/Product"
import AddProduct from "./pages/AddProduct"
import { useContext } from "react"
import { AppContext } from "./context/AppContext"
import { ToastContainer, toast } from 'react-toastify';
import EditProduct from "./pages/EditProduct"
import Header from "./components/Header"


function App() {

  const {token} = useContext(AppContext)

  return (
    <BrowserRouter>
      <ToastContainer/>
      <Header/>
        <Routes>
         
          <Route path="/" element={<Login />} />
          <Route path="/product" element={token ? < Product /> : <Login/>} />  
          <Route path="/add-product" element={token ? <AddProduct/> : <Login/>} />  
          <Route path="/edit-product/:productId" element={token ? <EditProduct/> : <Login/>} />  

        </Routes>
    </BrowserRouter>
  )
}

export default App
