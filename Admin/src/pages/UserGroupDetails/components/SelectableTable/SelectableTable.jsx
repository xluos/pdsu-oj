import React, { Component } from 'react';
import { Table, Button, Icon, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';

const getMockData = () => {
  const result = [];
  for (let i = 0; i < 20; i++) {
    result.push({
      id: 100306660940 + i,
      title: {
        name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible`,
      },
      type: 'demo示例',
      template: '参数字典列表',
      status: '已发布',
      publisher: '小马',
      rate: '5',
      time: 2000 + i,
    });
  }
  return result;
};

// 注意：下载数据的功能，强烈推荐通过接口实现数据输出，并下载
// 因为这样可以有下载鉴权和日志记录，包括当前能不能下载，以及谁下载了什么

export default class SelectableTable extends Component {
  static displayName = 'SelectableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    // 表格可以勾选配置项
    this.rowSelection = {
      // 表格发生勾选状态变化时触发
      onChange: (ids) => {
        console.log('ids', ids);
        this.setState({
          selectedRowKeys: ids,
        });
      },
      // 全选表格时触发的回调
      onSelectAll: (selected, records) => {
        console.log('onSelectAll', selected, records);
      },
      // 支持针对特殊行进行定制
      getProps: (record) => {
        return {
          disabled: record.id === 100306660941,
        };
      },
    };

    this.state = {
      selectedRowKeys: [],
      dataSource: getMockData(),
    };
  }

  clearSelectedKeys = () => {
    this.setState({
      selectedRowKeys: [],
    });
  };

  deleteSelectedKeys = () => {
    const { selectedRowKeys } = this.state;
    console.log('delete keys', selectedRowKeys);
  };

  deleteItem = (record) => {
    const { id } = record;
    console.log('delete item', id);
  };

  renderOperator = (value, index, record) => {
    return (
      <div>
        <a>通过</a>
        <a
          style={styles.removeBtn}
          onClick={this.deleteItem.bind(this, record)}
        >
          拒绝
        </a>
      </div>
    );
  };

  render() {
    return (
      <div className="selectable-table" style={styles.selectableTable}>
        <IceContainer style={styles.IceContainer}>
          <div>
            <Button type="primary" style={styles.batchBtn}>通过</Button>
            <Button
              onClick={this.deleteSelectedKeys}
              type="primary"
              warning
              style={styles.batchBtn}
              disabled={!this.state.selectedRowKeys.length}
            >拒绝</Button>
          </div>
        </IceContainer>
        <Table
          dataSource={this.state.dataSource}
          loading={this.state.isLoading}
          rowSelection={{
            ...this.rowSelection,
            selectedRowKeys: this.state.selectedRowKeys,
          }}
        >
          <Table.Column title="编码" dataIndex="id" width={120} />
          <Table.Column title="类型" dataIndex="type" width={160} />
          <Table.Column title="模板" dataIndex="template" width={160} />
          <Table.Column title="修改时间" dataIndex="time" width={120} />
          <Table.Column
            title="操作"
            cell={this.renderOperator}
            lock="right"
            width={120}
          />
        </Table>
      </div>
    );
  }
}

const styles = {
  selectableTable: {
    // width: '70%',
    width: '1024px',
  },
  batchBtn: {
    marginRight: '10px',
  },
  IceContainer: {
    padding: '0',
    marginBottom: '20px',
    borderRadius: '0px',
    minHeight: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
  },
  removeBtn: {
    marginLeft: 10,
  },
};
