import React from 'react';

export default function Placeholder (props) { 
  return (
    <div style={{
      fontSize: '100px',
      textAlign: 'center',
      color: '#333',
      lineHeight: '300px'
    }}>{props.content}</div>
  )
}