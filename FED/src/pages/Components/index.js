import React, { Component } from 'react';
import CustomCodemirror from './components/CustomCodemirror';
import CodeSyntaxHighlight from "./components/CodeSyntaxHighlight";
export default class Components extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
    <div className="components-page" >
      <CustomCodemirror/>
      <CodeSyntaxHighlight />
    </div>);
  }
}
