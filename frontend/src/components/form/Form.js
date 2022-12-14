import React,{useState} from 'react';
import './form.css'

export const Form = ()=>{

    const [fname,setFname] = useState('')
    const [lname,setLname] = useState('')

    const formHandler = (event)=>{
        event.preventDefault()
        console.log(event);
        setFname(event.target[0].value)
        setLname(event.target[1].value)
    }

    return (
        <form onSubmit={formHandler}>
            <div>
                <h1 className="heading">{fname} {lname}</h1>
                <input className='sic' type="text" placeholder='Enter Your Sic'/><br /> 
                <input className='fname' type="text" placeholder='Enter Your First Name'/><br />
                <input className='lname' type="text" placeholder='Enter Your Last Name'/><br /> 
                <button type='Submit' >Click</button>
            </div>
        </form>    
    )
}