import React, { Component } from 'react';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="about-page" style={{
      fontSize: '100px',
      textAlign: 'center',
      color: '#333',
      lineHeight: '300px'
    }}>About</div>;
  }
}
