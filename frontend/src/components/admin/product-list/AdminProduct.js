import React from "react";
import './Product.css'
import { useNavigate } from 'react-router-dom';

export const AdminProduct = (props)=>{
    console.log(props)
    const navigate = useNavigate();
    const buttonHandler = () =>{
        navigate('/admin/product/edit', {state:{product:props}});
    }

    return (
        <div className="product_container">
            <h3 className="product_name">{props.name}</h3>
            <div>
                <img className='product_img' src={props.image} alt="" ></img>
            </div>
            <div className="product_info">
                <h5 className="product_desc">{props.desc}</h5>
                <span className="product_price">₹ {props.price}</span>
                <div>
                <button className='product_btn' onClick={buttonHandler}> EDIT / DELETE</button>
                </div>
            </div>
        </div>
    )
}