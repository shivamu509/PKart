import React, { useState } from 'react'
import AmountContext from './AmountContext';
export const AmountState = (props) => {
    const [amount,setAmount] = useState(0);
  return (
    <AmountContext.Provider value={{amount,setAmount}}>
        {props.children}
    </AmountContext.Provider>
  )
}