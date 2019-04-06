/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Input, Grid, Message, Form, Button } from '@alifd/next';
import api from '../../../../api';
import './Register.scss';
import { withRouter, Link } from 'react-router-dom';
import { setUserInfo } from "../../../../lib/Storage";
import { get } from "../../../../lib/Utils";
const { Row } = Grid;
const Item = Form.Item;
@withRouter
export default class Register extends Component {
  static displayName = 'Register';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        userId: '',
        password: '',
        repassword: '',
      },
      loading: false
    };
  }

  checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入正确的密码');
    } else if (values.length < 8) {
      callback('密码必须大于8位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
    }
  };

  checkPasswd2 = (rule, values, callback, stateValues) => {
    if (!values) {
      callback('请输入正确的密码');
    } else if (values && values !== stateValues.password) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = async (values, errors) => {
    if (errors) {
      Message.error('提交错误！请检查参数');
      return;
    }
    try {
      this.setState({loading: true})
      let user = await api.base.signup(values)
      if (user.code) {
        throw Error(user.massage)
      }
      Message.success('注册成功');
      setUserInfo(user.data)
      setTimeout(()=>{
        this.props.history.replace(get(this.props, 'location.state.backUrl', '/'));
      }, 1000)
      
    } catch (error) {
      Message.error(error.message || '系统异常');
      console.error(error);
    } finally {
      this.setState({loading: false})
    }
  };

  render() {
    return (
      <div style={styles.container} className="user-register">
        <div style={styles.header}>
          <a href="#" style={styles.meta}>
            <img
              style={styles.logo}
              src={require('./images/TB13UQpnYGYBuNjy0FoXXciBFXa-242-134.png')}
              alt="logo"
            />
            <span style={styles.title}>PDSU OJ</span>
          </a>
          <p style={styles.desc}>让刷题训练简单而友好</p>
        </div>
        <div style={styles.formContainer}>
          <h4 style={styles.formTitle}>注 册</h4>
          <Form
            value={this.state.value}
            onChange={this.formChange}
            size="large"
          >
              <Item
                required
                asterisk
                requiredMessage="必填"
                length={9}
                lengthMessage="请输入9位的学号"
                format="number"
                formatMessage="请输入正确的学号"
              >
                <Input type="number" name="userId" size="large" placeholder="学号"
                  trim
                />
              </Item>
              <Item
                required
                requiredMessage="必填"
                asterisk
                message="请输入正确的用户名"
              >
                <Input name="name" trim size="large" maxLength={6} placeholder="用户名" />
              </Item>

              <Item
                requiredMessage="必填"
                required
                asterisk
                validator={this.checkPasswd}
              >
                <Input
                  name="password"
                  trim
                  htmlType="password"
                  size="large"
                  placeholder="至少8位密码"
                />
              </Item>
              <Item
                requiredMessage="必填"
                required
                asterisk
                validator={(rule, values, callback) =>
                  this.checkPasswd2(
                    rule,
                    values,
                    callback,
                    this.state.value
                  )
                }
              >
                <Input name="repassword"
                  trim
                  htmlType="password"
                  size="large"
                  placeholder="确认密码"
                />
              </Item>

              <Row style={styles.formItem}>
                <Form.Submit
                  type="primary"
                  validate
                  loading={this.state.loading}
                  onClick={this.handleSubmit}
                  style={styles.submitBtn}
                >
                  注 册
                </Form.Submit>
              </Row>

              <Row style={styles.tips}>
                <Link to="/login" style={styles.link}>
                  使用已有账户登录
                </Link>
              </Row>
          </Form>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    paddingTop: '100px',
    background: '#f0f2f5',
    backgroundImage: `url${require('./images/TB1kOoAqv1TBuNjy0FjXXajyXXa-600-600.png')}`,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '40px',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  title: {
    textAlign: 'center',
    fontSize: '33px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontFamily: 'Myriad Pro, Helvetica Neue, Arial, Helvetica, sans-serif',
    fontWeight: '600',
  },
  desc: {
    margin: '10px 0',
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.45)',
  },
  logo: {
    marginRight: '10px',
    width: '48px',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '368px',
    margin: '0 auto',
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column',
    padding: '0',
  },
  formItemCol: {
    position: 'relative',
    padding: '0',
  },
  formTitle: {
    textAlign: 'center',
    margin: '0 0 20px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#999',
  },
  submitBtn: {
    fontSize: '16px',
    height: '40px',
    lineHeight: '40px',
    background: '#3080fe',
    borderRadius: '4px',
  },
  checkbox: {
    marginLeft: '5px',
  },
  tips: {
    justifyContent: 'center',
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '13px',
  },
  line: {
    color: '#dcd6d6',
    margin: '0 8px',
  },
};
