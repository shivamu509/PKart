import React, { useContext, useState } from "react";
import CartContext from "../../../context/CartContext";
import AmountContext from "../../../context/AmountContext";

export const CartItem = (props) =>{
    const AmtCtx = useContext(AmountContext)
    const CartCtx = useContext(CartContext)
    const [changeQuantity,setChangeQuantity] = useState(props.qty)
    let CartItems = [...CartCtx.cartItems];
    CartItems = CartItems.filter(cartitem=>cartitem.product_name === props.product_name);
    let x =AmtCtx.amount;
    console.log(CartItems[0],props,changeQuantity,x)
    AmtCtx.setAmount(CartItems[0].qty*CartItems[0].product_price)
    const incHandler=()=>{
        CartItems[0].qty = CartItems[0].qty + 1;
        setChangeQuantity(CartItems[0].qty)
        AmtCtx.setAmount(CartItems[0].qty)
    }
    const decHandler=()=>{
        if(CartItems[0].qty > 1){
            CartItems[0].qty = CartItems[0].qty - 1;
            setChangeQuantity(CartItems[0].qty)
            AmtCtx.setAmount(CartItems[0].qty) 
        }
        else{
            CartItems[0].qty = CartItems[0].qty - 1;
            AmtCtx.setAmount(CartItems[0].qty)
            removeHandler();
        }
    }
    const removeHandler=()=>{
        let Cart = [...CartCtx.cartItems];
        Cart = Cart.filter(cartitem=>cartitem.product_name !== props.product_name);
        console.log(Cart);
        CartCtx.setCartItems(Cart);
    }
    return(
    <div className='display-cart'>
        <img className="cart-image" src={props.image} alt="product_image" />
        <span className="cart-product-name">{props.product_name}</span>
        <span className="cart-product-price">{props.product_price}</span>
        <button className="inc" onClick={incHandler}>+</button>
        <span className="product-quantity">{changeQuantity}</span>
        <button className="dec" onClick={decHandler}>-</button>
        <span className="product-total-price">${props.product_price*changeQuantity}</span>
        <img className="delete-product" src="https://cdn-icons-png.flaticon.com/512/64/64022.png" onClick={removeHandler} alt="delete" />
        <hr />
    </div>
    );
}