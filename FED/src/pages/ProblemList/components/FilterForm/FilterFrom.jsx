/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Input, Button } from '@alifd/next';

export default class Filter extends Component {
  state = {
    value: ''
  };

  formChange = () => {
    console.log(this.state.value);
    this.props.onChange(this.state.value);
  };

  render() {
    return (
      <div style={styles.formItem}>
        <span style={styles.formLabel}>搜索：</span>
        <Input
          placeholder="标题、描述、作者等均可搜索"
          style={{ width: '300px', marginRight: '20px' }}
          onChange={(value) => this.setState({value})} />
        <Button type="primary" onClick={this.formChange}>搜索</Button>
      </div>
    );
  }
}

const styles = {
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  formLabel: {
    minWidth: '80px',
  },
};
