import React, { Component } from 'react';
import Login from './components/Login';

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="log-in-page">
        <Login />
      </div>
    );
  }
}
