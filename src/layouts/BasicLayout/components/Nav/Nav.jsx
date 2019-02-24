import React from 'react';
import { Link } from 'react-router-dom'
import routerData from '../../../../router';

export default () => (
  <nav>
    <ul>
      {
        routerData.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>{item.path}</Link>
          </li>
        ))
      }
    </ul>
  </nav>
);