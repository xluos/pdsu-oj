/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Input, Grid, Message, Form } from '@alifd/next';
import './Login.scss';
import api from '../../../../api';
import { withRouter, Link } from 'react-router-dom';

const { Row } = Grid;
const Item = Form.Item;

class Login extends Component {
  static displayName = 'Login';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        account: '',
        password: '',
        checkbox: false,
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = async (values, errors) => {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    console.log('values:', values);
    try {
      let data = await api.base.login(values)
      if(data.code) {
        throw Error(data.message)
      }
      Message.success('登录成功');
      this.props.history.push('/');
    } catch (error) {
      Message.success('登陆失败', error.message);
    }
  };

  render() {
    const path = {pathname: '/signup', query: {a: 45, b: 'asd'}}
    return (
      <div style={styles.container} className="user-login">
        <div style={styles.header}>
          <a href="#" style={styles.meta}>
            <img
              style={styles.logo}
              src={require('./images/TB13UQpnYGYBuNjy0FoXXciBFXa-242-134.png')}
              alt="logo"
            />
            <span style={styles.title}>PDSU OJ</span>
          </a>
          <p style={styles.desc}>让刷题变的简单而友好</p>
        </div>
        <div style={styles.formContainer}>
          <h4 style={styles.formTitle}>登 录</h4>
          <Form
            value={this.state.value}
            onChange={this.formChange}
            size="large"
            ref="form"
          >
            <Item required requiredMessage="必填">
              <Input
                name="account"
                size="large"
                placeholder="账号"
              />
            </Item>
            <Item required requiredMessage="必填">
              <Input
                name="password"
                size="large"
                htmlType="password"
                placeholder="密码"
              />
            </Item>

            <Row style={styles.formItem}>
              <Form.Submit
                type="primary"
                onClick={this.handleSubmit}
                style={styles.submitBtn}
                validate
              >
                登 录
                </Form.Submit>
            </Row>

            <Row className="tips" style={styles.tips}>
              <a href="/signup" style={styles.link}>
                立即注册
                </a>
              <span style={styles.line}>|</span>
              <a href="/signup" style={styles.link}>
                忘记密码
                </a>
            </Row>
            <Link to={path}>凸凹转</Link>
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

export default withRouter (Login);