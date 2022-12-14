import React,{useContext} from "react";
import './Product.css'
import CartContext from '../../../context/CartContext'

export const Product = (props)=>{
    const CartCtx = useContext(CartContext);
    const buttonHandler = () =>{   
        const cartObject = {
            product_name:props.name,
            qty:1,
            product_price:props.price,
            product_image:props.image
        }
        let CartItems = [...CartCtx.cartItems];
        CartItems = CartItems.filter(cartitem=>cartitem.product_name === props.name);
        if(CartItems.length > 0){
            CartItems[0].qty = CartItems[0].qty + 1;
        }
        else{
            CartCtx.setCartItems([...CartCtx.cartItems,cartObject])
        }
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
                    <button className='product_btn' onClick={buttonHandler}>Buy Now</button>
                </div>
            </div>
        </div>
    )
}