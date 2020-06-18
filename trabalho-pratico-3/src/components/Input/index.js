import React, { Component } from 'react'
import CurrencyInput from 'react-currency-input';
import './style.css';

export default class Input extends Component {
  
  render() {
    const { label } = this.props;

    return (
      <div className='brute-salary-input'>
        <label>{label}</label>
        <CurrencyInput 
          prefix='R$ ' 
          decimalSeparator=',' 
          thousandSeparator='.' 
        />
      </div>
    );
  }
}
