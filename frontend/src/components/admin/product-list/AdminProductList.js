import React, { useContext, useEffect} from 'react'
import ProductContext from '../../../context/ProductContext'
import { AdminProduct } from './AdminProduct'
import { Link } from 'react-router-dom';

export const AdminProductList = (props) => {
    const ProductCtx = useContext(ProductContext);
    const {products} = ProductCtx
    useEffect(()=>{
        getProducts();
    },[])
    const getProducts = async() =>{
        const data = await fetch("http://localhost:4001/product/");
        const products_data = await data.json();
        ProductCtx.setProducts(products_data.product); 
    }
  return (
    <div>
    <Link to="/admin/product/add"><button type="button" className='add-product'>Add Product</button></Link>
      <div>
          {props.children};
          {products.map((product,index)=>
          <AdminProduct 
          key={index} 
          id={product._id} 
          name={product.product_name} 
          image={product.product_image}
          price={product.product_price} 
          desc={product.product_description}/>
        )}
      </div>
    </div>

  )
}
