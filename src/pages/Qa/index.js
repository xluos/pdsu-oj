import React, { Component } from 'react';

export default class Qa extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="qa-page" style={{
      fontSize: '100px',
      textAlign: 'center',
      color: '#333',
      lineHeight: '300px'
    }}>QA</div>;
  }
}
