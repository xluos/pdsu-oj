import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Popover } from 'antd';
import routerData from '../../../../router.fed';
import './Nav.scss';
import { verifyLoginStatus ,clearLoginStatus } from '../../../../lib/Utils';
import { getUserInfo } from '../../../../lib/Storage';
import { Message } from '@alifd/next';

@withRouter
export default class Nav extends Component {
  state = {
    userStatus: verifyLoginStatus(),
    userInfo: getUserInfo()
  }
  go = (pathname) => {
    return {
      pathname,
      state: {
        backUrl: this.props.location.pathname
      }
    }
  }
  render () {
    const { userInfo, userStatus } = this.state
    return (
    <nav className="nav-bar">
      <div className="nav-bar-logo">LOGO</div>
      <ul className="nav-bar-item-box">
        {
          routerData.reduce((arr, item, index) => {
            if (item.isNav) {
              arr.push(
                <li key={index} className="nav-bar-item">
                  <Link to={item.path}>{item.name}</Link>
                </li>
              );
            }
            return arr
          }, [])
        }
      </ul>
      <div className="nav-bar-user">
        <Popover content={userStatus ? (
          <div>
            <p>
              <Link to="/user/profile" style={{color: '#777'}}>个人主页</Link>
            </p>
            <p>
              <Link to="/admin" style={{color: '#777'}}>控制台</Link>
              {/* <a href="/admin" target='_blank' style={{color: '#777'}}>控制台</a> */}
            </p>
            <p style={{cursor: 'pointer'}} onClick={()=> {
              clearLoginStatus()
              this.setState({
                userStatus: false
              })
              Message.notice('已退出')
            }}>退出</p>
          </div>
        ) : (
          <div>
            <p><Link to={this.go("/base/login")} style={{color: '#777'}}>登录</Link></p>
            <p><Link to={this.go("/base/signup")} style={{color: '#777'}}>注册</Link></p>
          </div>
        )} title={userStatus && userInfo.name || '未登录'}>
          <span className="user-name">
            {userStatus && userInfo.name || '未登录'}
          </span>
        </Popover>
      </div>
    </nav>
    );
  }
}


