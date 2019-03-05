import React from 'react';
import { Link } from 'react-router-dom';
import { Popover } from 'antd';
import routerData from '../../../../router';
import './Nav.scss';

export default function Nav () { return (
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
      <Popover content={(
        <div>
        <p>Content</p>
        <p>Content</p>
      </div>
      )} title="Title">
        <span className="user-name">
          徐帅武
        </span>
      </Popover>
    </div>
  </nav>
);}