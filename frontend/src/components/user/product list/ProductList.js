import React, { useContext, useEffect } from 'react'
import ProductContext from '../../../context/ProductContext'
import { Product } from '../product/Product'
import { Search } from "../search/Search"

export const ProductList = (props) => {
    const ProductCtx = useContext(ProductContext);
    const {products} = ProductCtx
    useEffect(()=>{
        getProducts();
        // eslint-disable-next-line
    },[])
    const getProducts = async() =>{
        const data = await fetch("http://localhost:4001/product/");
        const products_data = await data.json();
        ProductCtx.setProducts(products_data.product); 
    }
  return (
    <div>
    <Search />
      <div>
          {products.map((product,index)=>
          <Product key={index} name={product.product_name} 
          image={product.product_image}
          price={product.product_price} 
          desc={product.product_description}/>
        )}
      </div>
    </div>

  )
}
