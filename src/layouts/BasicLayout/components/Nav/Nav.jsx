import React from 'react';
import { Link } from 'react-router-dom'
import routerData from '../../../../router';

export default () => (
  <nav className="nav">
    <ul>
      {
        routerData.reduce((arr, item, index) => {
          if (item.isNav) {
            arr.push(
              <li key={index} className="nav-item">
                <Link to={item.path}>{item.name}</Link>
              </li>
            );
          }
          return arr
        }, [])
      }
    </ul>
  </nav>
);