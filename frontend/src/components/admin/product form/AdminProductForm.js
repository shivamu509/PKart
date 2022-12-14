import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom"
import './ProductForm.css';
import axios from "axios";
import ProductContext from "../../../context/ProductContext";
import { useNavigate } from 'react-router-dom';

export const AdminProductForm = ()=>{
    const navigate = useNavigate();
    const { state } = useLocation();
    const {product} = state;
    const {id, name, price, image, desc} = product;
    const ProductCtx = useContext(ProductContext)
    const [resMessage, setResMessgae] = useState('');
    const [formInput,setFormInput] = useState({
        productName:'',
        productPrice:'',
        productImage:'',
        productDescription:''
    });


    const productNameHandler = (event) =>{
        console.log(event.target.value)
        setFormInput((prevState)=>{
            return{
                ...prevState,
                productName:event.target.value
            }
        })
    }
    const productPriceHandler = (event) =>{
        console.log(event.target.value)
        setFormInput((prevState)=>{
            return{
                ...prevState,
                productPrice:event.target.value
            }
        })
    }
    const productImageHandler = (event) =>{
        console.log(event.target.value)
        setFormInput((prevState)=>{
            return{
                ...prevState,
                productImage:event.target.value
            }
        })
    }
    const productDescriptionHandler = (event) =>{
        console.log(event.target.value)
        setFormInput((prevState)=>{
            return{
                ...prevState,
                productDescription:event.target.value
            }
        })
    }
    const editProductHandler = (event) =>{
        console.log(event)
        event.preventDefault();
        let error = '';
        if(formInput.productName === ''){
            error='Please enter Product Name';
            setResMessgae(error);
        }
        else if(formInput.productPrice === ''){
            error='Please enter Product Name';
            setResMessgae(error);
        }
        else if(formInput.productImage === ''){
            error='Please enter Product Image';
            setResMessgae(error);
        }
        else if(formInput.productDescription === ''){
            error='Please enter Product Description';
            setResMessgae(error);
        }
        if(error==='')
            saveProductData(formInput)
    }

    
    const saveProductData = async(formData)=>{
        try{

            const product ={
                product_name : formData.productName,
                product_price : formData.productPrice,
                product_description : formData.productDescription,
                product_image : formData.productImage
        }
        console.log(product);
        const result = await (axios.put(`http://localhost:4001/product/${id}`,product,{
            header:{
                'Content-Type': 'application/json'
            }
        }))
        console.log(result.data.message) 
        setResMessgae('');
        ProductCtx.setProducts([...ProductCtx.products,product])
        navigate('/admin/product');  
    }catch(err){
        console.log(err.message)
    }
}

const deleteProductHandler = () =>{
        const result = axios.delete(`http://localhost:4001/product/${id}`)
        navigate('/admin/product');  
    }

    return (
        <>

            <h1 className="pheading">Edit Product</h1>
            <div className="pform-container">
            <p style={{textAlign: 'center', color:'red', fontWeight: 'bold'}}>{resMessage}</p>
            <form>
                <div className="pform-input">
                    <input className="pinput" type="text" onChange={productNameHandler} placeholder={name}></input>
                </div>
                <div className="pform-input">
                    <input className="pinput" type="text" onChange={productPriceHandler} placeholder={price}></input>
                </div>
                <div className="clearfix"></div>
                <div className="pform-input">
                    <input className="pinput" type="text" onChange={productImageHandler} placeholder={image}></input>
                </div>
                <div className="pform-input">
                    <input className="pinput" type="text" onChange={productDescriptionHandler} placeholder={desc}></input>
                </div>
                <div className="clearfix"></div>
                <div className="pform-input">
                    <button className="btn_product" onClick={editProductHandler}>Edit Product</button>
                    <button className="btn_product delete" onClick={deleteProductHandler}>Delete Product</button>
                <div className="clearfix"></div>
                </div>
                <div className="clearfix"></div>
            </form>
        </div>
        </>
    )
}
