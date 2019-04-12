/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select, Button } from '@alifd/next';

const { Row, Col } = Grid;

export default class Filter extends Component {
  state = {
    value: {},
  };

  onFilter = () => {
    this.props.onChange(this.state.value)
  }

  render() {
    return (
      <div>
        <Row gutter="20" style={styles.formRow}>
          <Col span={20}>
            <Row wrap gutter="20" >
              <Col l="24">
                <div style={styles.formItem}>
                  <span style={styles.formLabel}>姓名：</span>
                  <Input
                    placeholder="请输入"
                    style={{ width: '200px' }}
                    onChange={ val => this.setState({value: {text: val}}) } />
                </div>
              </Col>
              <Col l="24">
                <div style={styles.formItem}>
                  <span style={styles.formLabel}>年级：</span>
                  <Select style={{ width: '200px' }}>
                    <Select.Option value="1">15物联网工程一班</Select.Option>
                    <Select.Option value="2">15物联网工程二班</Select.Option>
                    <Select.Option value="3">15物联网工程三班</Select.Option>
                    <Select.Option value="3">展示功能暂不支持</Select.Option>
                  </Select>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={4}>
            <div style={styles.item}>
              <Button type="primary" onClick={this.onFilter} style={{marginRight: '16px'}}>筛选</Button>
              <Button onClick={() => this.props.onChange({})}>重置</Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const styles = {
  item: {
    margin: '10px 0',
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  formLabel: {
    minWidth: '80px',
  },
};
