import React, { Component } from 'react';
import { Input, Button } from '@alifd/next';
import IceContainer from '@icedesign/container';

export default class Filter extends Component {
  static displayName = 'Filter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.onSearch = this.props.onSearch
    this.state = {
      val: ''
    };
  }

  handleSearch = () => {
    this.onSearch(this.state.val)
  }

  render() {
    return (
      <IceContainer style={styles.container}>
        <div style={styles.label}>用户组名称:</div>
        <Input
          placeholder="请输入用户组名称"
          hasClear
          trim
          onChange={val => this.setState({val})}
          onPressEnter={this.handleSearch} />
        <Button type="primary" style={styles.button} onClick={this.handleSearch}>
          查 询
        </Button>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    margin: '20px 0px',
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    height: '32px',
    fontWeight: '500',
    marginRight: '10px',
  },
  button: {
    marginLeft: '20px',
  },
};
