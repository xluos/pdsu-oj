import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Badge, Button, Icon, Dialog } from '@alifd/next';
import SelectableTable from '../SelectableTable'
const { Row, Col } = Grid;

export default class BasicDetailInfo extends Component {
  static displayName = 'BasicDetailInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      showApplyList: false,
    };
  }
  applyListToggle = () => {
    this.setState({showApplyList: !this.state.showApplyList})
  }
  render() {
    const { dataSource = {} } = this.props
    console.log("dataSource", dataSource);
    const { showApplyList } = this.state
    return (
      <IceContainer>
        <Dialog
          footer={false}
          title="申请用户"
          onClose={this.applyListToggle}
          visible={showApplyList}
          autoFocus={true}
          >
          <SelectableTable applyUsers={dataSource.applyUsers}/>
        </Dialog>
        <div style={styles.titleBox}>
          <h2 style={styles.basicDetailTitle}>用户组详情页</h2>
          <Badge count={dataSource.applyUsers.length}>
            <Button
              onClick={this.applyListToggle}
              type="secondary"><Icon type="account" /> 申请列表</Button>
          </Badge>
          {/* TODO 添加成员 */}
        </div>

        <div style={styles.infoColumn}>
          <h5 style={styles.infoColumnTitle}>基本信息</h5>
          <Row wrap style={styles.infoItems}>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>用户组：</span>
              <span style={styles.infoItemValue}>{dataSource.name} <span style={styles.infoItemLabel}> ({dataSource.id})</span></span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>用户组描述：</span>
              <span style={styles.infoItemValue}>{dataSource.desc}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>人数：</span>
              <span style={styles.infoItemValue}>{dataSource.users.length}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>创建时间：</span>
              <span style={styles.infoItemValue}>{dataSource.createdAt}</span>
            </Col>
          </Row>
        </div>
        <div style={styles.infoColumn}>
          <h5 style={styles.infoColumnTitle}>创建者</h5>
          <Row wrap style={styles.infoItems}>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>姓名：</span>
              <span style={styles.infoItemValue}>{dataSource.createUser.name} <span style={styles.infoItemLabel}> ({dataSource.createUser.userId})</span></span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>邮箱：</span>
              <span style={styles.infoItemValue}>{dataSource.createUser.email}</span>
            </Col>
          </Row>
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  titleBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  basicDetailTitle: {
    margin: '0',
    fontSize: '18px',
  },
  infoColumn: {
    marginLeft: '16px',
  },
  infoColumnTitle: {
    margin: '20px 0',
    paddingLeft: '10px',
    borderLeft: '3px solid #3080fe',
  },
  infoItems: {
    padding: 0,
    marginLeft: '25px',
  },
  infoItem: {
    marginBottom: '18px',
    listStyle: 'none',
    fontSize: '14px',
  },
  infoItemLabel: {
    minWidth: '70px',
    color: '#999',
  },
  infoItemValue: {
    color: '#333',
  },
  attachLabel: {
    minWidth: '70px',
    color: '#999',
    float: 'left',
  },
  attachPics: {
    width: '80px',
    height: '80px',
    border: '1px solid #eee',
    marginRight: '10px',
  },
};
