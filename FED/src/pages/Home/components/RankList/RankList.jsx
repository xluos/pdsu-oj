import React from 'react';
import './RankList.scss';

export default function RankList (props) { 
  const {
    bgcolor = '#fc6262',
    isShowRank = true,
    title = '排行榜',
    head = [],
    body = []
  } = props;
  let headDOM = head.map((item, index) => (<th key={index}>{item.name}</th>))
  isShowRank && headDOM.unshift(<th key="rank-1">排名</th>)

  let bodyDOM = body.map((item, index) => {
    let trDOM = head.map((citem, index) => (<td key={index}>{item[citem.key]}</td>))
    if (isShowRank) {
      if (index < 3) trDOM.unshift(<td key={`td-${index}`}><img src={require(`./images/${index}.png`)} alt={index}/></td>)
      else trDOM.unshift(<td key={`td-${index}`}>{index + 1}</td>)
    }
    return (<tr key={index}>{trDOM}</tr>);
  })
  return (
  <div className="rank-list-box" style={{borderTopColor: bgcolor}}>
    <h4 className="rank-list-title">{title}</h4>
    <table className="rank-list-content">
      <thead><tr>{ headDOM }</tr></thead>
      <tbody>{ bodyDOM }</tbody>
    </table>
  </div>
);}