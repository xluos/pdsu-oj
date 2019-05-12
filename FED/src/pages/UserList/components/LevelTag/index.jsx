import React from 'react';
import { Tag } from '@alifd/next';

export default function LevelTag (val) {
  const level = ['青铜', '白银', '黄金', '铂金', '钻石', '最强王者']
  const color = ['#52c41a','#d9d9d9','#ffc53d','#d3adf7','#adc6ff','#ffec3d']
  return (
    <Tag type="normal" size="small" style={{
      color: `${color[val]}`,
      borderColor: `${color[val]}`,
      backgroundColor: `${color[val]}0F`,
      fontSize: '14px'
    }}>{level[val] || '未知'}</Tag>
  )
}
