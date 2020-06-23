import React from 'react'
import CountUp from 'react-countup';

export default function Votes({ value, previous }) {
  console.log(value, previous)
  return (
    <div>
      <CountUp
        start={previous || 0}
        end={value}
        duration={0.6}
        separator="."
        decimals={4}
      >
        {({ countUpRef }) => (
          <div>
            <span ref={countUpRef} />
          </div>
        )}
      </CountUp>
    </div>
  )
}
