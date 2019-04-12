import React from "react";
import { Icon, message } from "antd";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './index.scss';

export default function CodeBlock ({content}) {
  return (
    <div className="code-block">
      <pre dangerouslySetInnerHTML={{__html: content}}></pre>
      <CopyToClipboard
        text={content}
        onCopy={() => message.info('复制成功')}>
        <a><Icon type="copy" />复制</a>
      </CopyToClipboard>
    </div>
  )
}
