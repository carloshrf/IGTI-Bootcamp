import React from 'react'
import Installment from './Installment';

export default function Installments({installments}) {
  return (
    <>
      {installments.map(({id, accumulated, profit, percentage}) => {
        return( 
          <Installment 
            key={id}
            id={id}
            accumulated={accumulated}
            profit={profit}
            percentage={percentage}
          />
        );
      })}  
    </>
  )
}
