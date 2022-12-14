import React,{useContext} from "react";
import { CartItem } from '../cart-item/CartItem';
import './cart.css';
import CartContext from "../../../context/CartContext";
// import AmountContext from "../../../context/AmountContext";


export const Cart = () =>{
    const CartCtx = useContext(CartContext);
    // const AmtCtx  = useContext(AmountContext);
    
    return(
        <div className="cart-container">
            <div className="cart-details">
            {
                CartCtx.cartItems.length>0 ? 
                CartCtx.cartItems.map((item,index)=>
                    <CartItem 
                        product_name = {item.product_name} 
                        product_price = {item.product_price} 
                        qty = {item.qty} 
                        image={item.product_image} 
                        key = {index}
                    />
                )
                :
                <div className="alert alert-danger ">Sorry you dont have any item in your cart</div>
            }
            {/* <div className='alert alert-success'>Total Price :₹4957</div> */}
            </div>
            
        </div>
    );
}