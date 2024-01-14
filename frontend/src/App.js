import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduk";
import EditProduct from "./pages/EditProduct";
import Products from "./pages/Products";
import AddUsers from "./pages/AddUsers";
import EditUsers from "./pages/EditUsers";
import Login from "./components/Login";
import Register from "./components/Register";
import Users from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/product/add" element={<AddProduct/>}/>
        <Route path="/product/edit/:id" element={<EditProduct/>}/>
        <Route path="/users/add" element={<AddUsers/>}/>
        <Route path="/users/edit/:id" element={<EditUsers/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/product" element={<Products/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
