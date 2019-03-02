import React from 'react';
import { Link } from 'react-router-dom';
import './ProblemItem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ProblemItem (props) { 
  const {
    submit = 0,
    ac = 0,
    content = '',
    tags = ['积分','通过数']
  } = props;
  return (
  <div className="problem-item">
    <div className="submit-info">
      <p className="number"><strong>{submit}</strong></p>
      <p className="text">提交</p>
    </div>
    <div className="ac-info">
      <p className="ac"><strong>{ac}</strong></p>
      <p className="text">通过</p>
    </div>
    <div className="problem-info">
      <Link className="title" to="">题目一二三四五六七八九十</Link>
      <p className="content">{content || '题目内容》》》题目内容》》》题目内容》》》题目内容》》》题目内容》》》题目内容》》》题目内容》》》题目内容》》》题目内容》》》题目内容》》》'}</p>
      <div className="tags">
        {tags.map((item, index) => (<span key={index}>{item}</span>))}
      </div>
    </div>
    <button><FontAwesomeIcon icon="bolt" /> 挑战</button>
  </div>
);}