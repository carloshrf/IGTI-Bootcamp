import React, { Component } from 'react'

export default class index extends Component {
  render() {
    const { percent, color } = this.props;
    
    return (
      <>
        <div 
          style={{
            height: '15px', 
            width: `${percent !== '' ? percent : 0}%`, 
            background: `${color}`
            }}
        >
        </div>
      </>
    )
  }
}
