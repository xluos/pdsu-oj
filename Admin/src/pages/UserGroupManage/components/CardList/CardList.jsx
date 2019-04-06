import React, { Component } from 'react';
import { Icon, Grid, Loading } from '@alifd/next';
import Filter from './Filter';
import { Link } from "react-router-dom";
import DataBinder from '@icedesign/data-binder';
import api from '../../../../api/api';
const { Row, Col } = Grid;

@DataBinder({
  userGroup: {
    url: '/user/user-group/all',
    method: 'get',
    data: {
    },
    defaultBindingData: {
      items: []
    }
  }
}, {requestClient: api})
export default class CardList extends Component {
  static displayName = 'CardList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.updateBindingData('userGroup')
  }

  render() {
    const { userGroup, __loading } = this.props.bindingData;
    return (
      <div style={styles.container}>
        <Filter />
        <Loading tip="loading..." style={{width: '100%'}} visible={__loading}>
          <Row wrap gutter="20" style={styles.row}>
            <Col l="6" xs="12" xxs="24">
              <Link to="/usergroup/create" style={{ ...styles.card, ...styles.createScheme }}>
                <Icon type="add" size="large" style={styles.addIcon} />
                <span>新增用户组</span>
              </Link>
            </Col>
            { userGroup && userGroup.items && userGroup.items.map((item, index) => {
              return (
                <Col l="6" xs="12" xxs="24" key={index}>
                  <div style={styles.card}>
                    <Link to={`/usergroup/${item.id}`} style={{textDecoration: 'none'}}>
                      <div style={styles.head}>
                        <h4 style={styles.title}>{item.name}</h4>
                        <p style={styles.desc}>{item.desc}</p>
                        <p style={styles.desc}>共{item.count}人</p>
                      </div>
                      <div style={styles.body}>
                        <p style={{ ...styles.creator, ...styles.info }}>
                          创建人：
                          {item.createUserName}
                        </p>
                        <p style={{ ...styles.time, ...styles.info }}>
                          创建时间：
                          {item.createdAt}
                        </p>
                      </div>
                    </Link>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Loading>
      </div>
    );
  }
}

const styles = {
  container: {
    background: '#fafafa',
    borderRadius: '6px',
    marginBottom: '20px',
  },
  createScheme: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '190px',
  },
  row: {
    margin: 0,
    padding: '0px 10px',
  },
  card: {
    displayName: 'flex',
    marginBottom: '20px',
    background: '#fff',
    borderRadius: '6px',
    boxShadow: '0px 0px 8px -2px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    height: '190px',
  },
  head: {
    position: 'relative',
    padding: '16px 16px 8px',
    borderBottom: '1px solid #e9e9e9',
  },
  title: {
    margin: '0 0 5px',
    width: '90%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '16px',
    fontWeight: '500',
    color: 'rgba(0,0,0,.85)',
  },
  desc: {
    margin: '0',
    fontSize: '14px',
    color: '#666',
  },
  body: {
    position: 'relative',
    padding: '16px',
  },
  info: {
    margin: '0 0 8px',
    fontSize: '13px',
    color: '#666',
  },
  time: {
    position: 'relative',
  },
  addIcon: {
    marginRight: '10px',
  },
  editIcon: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    cursor: 'pointer',
  },
};
