import React, { Component } from 'react';
import Register from './components/Register';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="sign-up-page">
        <Register />
      </div>
    );
  }
}
