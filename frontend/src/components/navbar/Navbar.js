import React, { useState,useContext, useEffect } from "react";
import './navbar.css';
import CartContext from "../../context/CartContext";
import { Link , useNavigate } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";

export const Navbar = ()=>{
    const AuthCtx = useContext(AuthContext);
    const CartCtx = useContext(CartContext);
    const navigate = useNavigate();
    const [noOfItems,setNoOfItmes] = useState(0);
    useEffect(()=>{
        setNoOfItmes(CartCtx.cartItems.length)
    },[CartCtx.cartItems]);
    const onLogOutHandler = () =>{
        AuthCtx.setIsLoggedIn(false);
        navigate('/admin/login');
    }
    return (
        <div className="navbar">
        <Link to='/'>
            <img className='title_img' src="https://see.fontimg.com/api/renderfont4/X395a/eyJyIjoiZnMiLCJoIjo2NSwidyI6MTAwMCwiZnMiOjY1LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/UEthcnQ/sandlera.png" alt="Pkart" />
        </Link>
        
        {/* <div className="nav-item">
        { !AuthCtx.isLoggedIn ? <Link className="nav-link" to="/admin/login">Login</Link>:
            <p className="nav-link" onClick={onLogOutHandler} style={{cursor:"pointer"}}>Log Out</p>
        }
        </div> */}
            <Link to='/cart'>
            <div className="cart">
                <div className="total_item">{noOfItems}</div>
                <img className="cart_img" src="https://cdn-icons-png.flaticon.com/512/891/891462.png" alt="cart"/>
            </div>
            </Link>
        </div>
    )
}
