import React, { Component } from 'react';

export default class Rank extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="rank-page" style={{
      fontSize: '100px',
      textAlign: 'center',
      color: '#333',
      lineHeight: '300px'
    }}>Rank</div>;
  }
}
