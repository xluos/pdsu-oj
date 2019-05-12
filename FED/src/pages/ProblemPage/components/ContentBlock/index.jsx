import React from 'react';
import './index.scss';

export default function ContentBlock (props) {
  const { title, content } = props;
  return (
  <div className="problem-content-block">
    <h4 className="problem-content-block--title">{title}</h4>
    {
      typeof content === 'string' ? (
        <div className="problem-content-block--content"
          dangerouslySetInnerHTML={{__html: content}} />
      ) : (
        content
      )
    }
  </div>
);}
