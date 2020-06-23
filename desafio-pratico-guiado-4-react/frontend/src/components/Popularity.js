import React from 'react'

const STARS = {
  full: '★',
  empty: '☆'
}

export default function Popularity({ value }) {
  
  const fullStars = STARS.full.repeat(value);
  const emptyStars = STARS.empty.repeat(10 - value);

  return (
    <div style={{ fontSize: '1.5rem', color: '#f39c12'}}>
      {fullStars}
      {emptyStars}
    </div>
  )
}
