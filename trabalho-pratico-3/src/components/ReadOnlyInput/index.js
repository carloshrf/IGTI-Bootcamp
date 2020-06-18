import React, { Component } from 'react'
import ReadOnlyCurrencyInput from 'react-currency-input';

export default class index extends Component {
  render() {
    const { label, value, suffix='', color='#000' } = this.props;

    return (
      <div>
        <label>{label}</label>
        <ReadOnlyCurrencyInput
          value={value}  
          prefix='R$ ' 
          suffix={suffix !== '' ? ` ${suffix}` : ''}
          decimalSeparator=',' 
          thousandSeparator='.' 
          readOnly  
          style={{ color: `${color}`, fontWeight: 'bold'}}
        />
      </div>
    )
  }
}
