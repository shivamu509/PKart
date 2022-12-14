import React, { useState, useContext } from "react";
import './login.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../../context/AuthContext";

export const Login = () => {
  const AuthCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [errmsg,setErrMsg] = useState('');
    const [user,setUser]  = useState({
        email:'',
        password:''
    })
    const emailHandler=(event)=>{
        setUser((prevState)=>{
            return{
                ...prevState,
                email:event.target.value
            }
        })
    }
    const passwordHandler=(event)=>{
        setUser((prevState)=>{
            return{
                ...prevState,
                password:event.target.value
            }
        })
    }
    const loginHandler = (event)=>{
        event.preventDefault();
        axios.post("http://localhost:4001/user/login",user,{
            headers:{
                'Content-Type':'application/json'
            }
        }).then(response=>{
            localStorage.setItem('user',response.data.user);
            localStorage.setItem('token',response.data.token);
            AuthCtx.setIsLoggedIn(true);
            navigate('/admin/product');
        })
        .catch(error=>{
            setErrMsg(error.response.data.message)
        })
    }

  return (
    <div className="form-container">
        <form className='form-area' onSubmit={loginHandler}>
        {errmsg!=='' && <div className="alert alert-danger">{errmsg}</div>}
            <input type="text" className='input' placeholder='Email' onChange={emailHandler}/>
            <input type="password" className='input' placeholder='Password' onChange={passwordHandler}/>
            <button type="submit" className='submit' >LOGIN</button>
        </form>
    </div>
  )
}
