import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Popover } from 'antd';
import routerData from '../../../../router.fed';
import { getUserInfo, setUserInfo } from "../../../../lib/Storage";
import Cookies from 'js-cookie'
import './Nav.scss';

@withRouter
export default class Nav extends Component {
  state = {
    userInfo: getUserInfo() || {}
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
    const { userInfo } = this.state
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
        <Popover content={userInfo.name ? (
          <div>
            <p>
              <Link to="/user/profile" style={{color: '#777'}}>个人主页</Link>
            </p>
            <p>
              <a href="/admin" target='_blank' style={{color: '#777'}}>控制台</a>
            </p>
            <p style={{cursor: 'pointer'}} onClick={()=> {
              Cookies.set('pdoj_token', null)
              setUserInfo({})
              this.setState({
                userInfo: {}
              })
            }}>退出</p>
          </div>
        ) : (
          <div>
            <p><Link to={this.go("/login")} style={{color: '#777'}}>登录</Link></p>
            <p><Link to={this.go("/signup")} style={{color: '#777'}}>注册</Link></p>
          </div>
        )} title={userInfo.name || '未登录'}>
          <span className="user-name">
            {userInfo.name || '未登录'}
          </span>
        </Popover>
      </div>
    </nav>
    );
  }
}


