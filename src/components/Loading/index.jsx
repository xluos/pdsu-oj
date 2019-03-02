import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const loadingStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  alignItems: 'center',
}
const textStyle = {
  fontSize: 30,
  paddingLeft: 15
}
export default function Loading (props) { 
  
  if (props.error) {
    return (
      <div style={loadingStyle}>
        <FontAwesomeIcon size="5x" icon={["far","frown"]} />
        <span style={textStyle}>发生错误请重试</span>
      </div>
    )
  } else if (props.timedOut) {
    return (
      <div style={loadingStyle}>
        <FontAwesomeIcon size="5x" icon={["fas","unlink"]} />
        <span style={textStyle}>超时！请检查网络是否断开</span>
      </div>
    )
  } else if (props.pastDelay) {
    return (
      <div style={loadingStyle}>
        <FontAwesomeIcon size="5x" icon="spinner" spin  />
      </div>
    )
  } else {
    return null
  }
}