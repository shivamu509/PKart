import React from 'react'
import { Routes,Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ProductState } from './context/ProductState';
import { CartState } from './context/CartState';
import {Navbar} from './components/navbar/Navbar'
import { Login } from './components/admin/validate/Login';
import {ProductForm} from './components/admin/product form/ProductForm';
import { ProductList } from './components/user/product list/ProductList';
import {AdminProductList} from './components/admin/product-list/AdminProductList'
import { AdminProductForm } from './components/admin/product form/AdminProductForm';
import { Cart } from './components/user/cart/Cart';
import {AuthState} from './context/AuthState'
import {ProtectRoute} from './components/admin/ProtectRoute'
import {AmountState} from './context/AmountState';

function App() {

  return (
    <div>
      <ProductState>
        <CartState>
          <AuthState>
            <Navbar/>
            <AmountState>
              <Routes>
                <Route path='/' element={<ProductList/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/admin/login' element={<Login/>}/>
                <Route element={<ProtectRoute/>}>
                <Route path='/admin/product' element={<AdminProductList/>}/>
                <Route path='/admin/product/edit' element={<AdminProductForm/>}/>
                <Route path='/admin/product/add' element={<ProductForm/>}/>
                </Route>
            </Routes>
            </AmountState>
          </AuthState>
        </CartState>
      </ProductState>
    </div>
  );
}

export default App;
