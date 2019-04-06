
import React, { Component }from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import './About.scss';
import Placeholder from '../../components/Placeholder';


export default class About extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className="about-page page" >
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/about">About</Link></Breadcrumb.Item>
        </Breadcrumb>
        <div className="about-content">
          {<Placeholder content="About"/>}
        </div>
      </div>
    );
  }
}

