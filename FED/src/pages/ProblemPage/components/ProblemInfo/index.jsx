import React from 'react';
import { Tag } from "antd";
export default function ProblemInfo (props) { 
  const { info } = props;
  const spanStyle = {
    padding: '0 15px'
  }
  return (
  <div style={{
    textAlign: 'center'
  }}>
    { info.no && <span style={spanStyle}>序号：<Tag color="orange">#{info.no}</Tag></span> }
    { info.level && <span style={spanStyle}>难度：<Tag color="blue">{info.level}</Tag></span> }
    { info.time && <span style={spanStyle}>时间：<Tag color="magenta">{info.time}</Tag></span> }
    { info.memory && <span style={spanStyle}>内存：<Tag color="purple">{info.memory}</Tag></span> }
  </div>
);}