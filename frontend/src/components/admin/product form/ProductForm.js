import React, { useContext, useState } from "react";
import './ProductForm.css';
import axios from "axios";
import ProductContext from "../../../context/ProductContext";
import { useNavigate } from 'react-router-dom';

export const ProductForm = (props)=>{
    const navigate = useNavigate();
    const ProductCtx = useContext(ProductContext)
    const [resMessage, setResMessgae] = useState('');
    const [formInput,setFormInput] = useState({
        productName:'',
        productPrice:'',
        productImage:'',
        productDescription:''
    });


    const productNameHandler = (event) =>{
        console.log(event)
        setFormInput((prevState)=>{
            return{
                ...prevState,
                productName:event.target.value
            }
        })
    }
    const productPriceHandler = (event) =>{
        setFormInput((prevState)=>{
            return{
                ...prevState,
                productPrice:event.target.value
            }
        })
    }
    const productImageHandler = (event) =>{
        setFormInput((prevState)=>{
            return{
                ...prevState,
                productImage:event.target.value
            }
        })
    }
    const productDescriptionHandler = (event) =>{
        setFormInput((prevState)=>{
            return{
                ...prevState,
                productDescription:event.target.value
            }
        })
    }
    const formSubmitHandler = (event) =>{
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
        const result = await (axios.post('http://localhost:4001/product',product,{
            header:{
                'Content-Type': 'application/json',
                'x-auth-token':localStorage.getItem('token')
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

    return (
        <div className="pform-container">
            <h1 className="pheading">Add Product</h1>
            <p style={{textAlign: 'center', color:'red', fontWeight: 'bold'}}>{resMessage}</p>
            <form onSubmit={formSubmitHandler}>
                <div className="pform-input">
                    <input className="pinput" type="text" placeholder="Product Name" onChange={productNameHandler} />
                </div>
                <div className="pform-input">
                    <input className="pinput" type="text" placeholder="Product Price" onChange={productPriceHandler}/>
                </div>
                <div className="clearfix"></div>
                <div className="pform-input">
                    <input className="pinput" type="text" placeholder="Product Image" onChange={productImageHandler}/>
                </div>
                <div className="pform-input">
                    <input className="pinput" type="text" placeholder="Product Description" onChange={productDescriptionHandler}/>
                </div>
                <div className="clearfix"></div>
                <div className="pform-input">
                    <button className="btn_add_product">Add Product</button>
                </div>
                <div className="clearfix"></div>
            </form>
        </div>
    )
}
