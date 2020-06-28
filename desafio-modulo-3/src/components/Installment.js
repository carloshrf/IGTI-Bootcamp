import React from 'react'
import css from './installment.module.css'
import Format from '../utils/format'

export default function Installment({
  id,
  accumulated, 
  profit, 
  percentage, 
}) {
  return (
    <div className={css.installment}>
      <span style={{fontWeight: 'bold'}}>{id}</span>
      <div className={css.details}>

        <div>
          <span style={{ 
            color: `${profit > 0 ? '#43CE38' : 'red'}`,
            fontWeight: '500'
          }}>
            {Format(Number(accumulated))}
          </span>
        </div>

        <div>
          <span style={{
            fontWeight: '500',
            color: `${profit > 0 ? '#43CE38' : 'red'}`,
          }}>
            {`${profit > 0 ? '+' : ' '}`}{Format(Number(profit))}
          </span>
        </div>

        <div>
          <span style={{
            fontWeight: '500',
            color: `${percentage > 0 ? '#0BBAA5' : 'red'}`,
          }}>
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  )
}
