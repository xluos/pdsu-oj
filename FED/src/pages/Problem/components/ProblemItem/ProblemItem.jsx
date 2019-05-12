import React from 'react';
import { Link } from 'react-router-dom';
import './ProblemItem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function filterText(params) {
  return params.replace(/<.*\/?.*\/?>/g, '').replace(/&nbsp;/g, '').replace(/\s+/g, ' ')
}

export default function ProblemItem (props) {
  const {
    id = '',
    submit = 0,
    solved = 0,
    title = '',
    describe = '',
    tags = []
  } = props;
  return (
  <div className="problem-item">
    <div className="submit-info">
      <p className="number"><strong>{submit}</strong></p>
      <p className="text">提交</p>
    </div>
    <div className="ac-info">
      <p className="ac"><strong>{solved}</strong></p>
      <p className="text">通过</p>
    </div>
    <div className="problem-info">
      <Link className="title" to={`/problem/${id}`}>{title}</Link>
      <p className="content">{filterText(describe)}</p>
      <div className="tags">
        {tags.map((item, index) => (<span key={index}>{item}</span>))}
      </div>
    </div>
    <Link to={`/problem/${id}`} style={{flexShrink: 0}}>
      <button><FontAwesomeIcon icon="bolt" /> 挑战</button>
    </Link>
  </div>
);}
