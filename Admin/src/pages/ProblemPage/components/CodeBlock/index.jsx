import React from "react";
import { Icon, message } from "antd";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './index.scss';

export default function CodeBlock ({content, copy=true, style, name, time}) {
  return (
    <div className="code-block" style={style}>
      <pre dangerouslySetInnerHTML={{__html: content}} style={style}></pre>
      { !copy && <p style={{ textAlign: 'right', fontSize: 14, color: '#aaa' }}>{ name }:{time}</p> }
      { copy && <CopyToClipboard
        text={content}
        onCopy={() => message.info('复制成功')}>
        <a><Icon type="copy" />复制</a>
      </CopyToClipboard> }
    </div>
  )
}
