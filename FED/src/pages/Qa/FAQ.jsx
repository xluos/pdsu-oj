
import React, { Component }from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import './FAQ.scss';
import Placeholder from '../../components/Placeholder';


export default class FAQ extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className="faq-page page" >
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/faq">FAQ</Link></Breadcrumb.Item>
        </Breadcrumb>
        <div className="faq-content">
          {<Placeholder content="FAQ"/>}
        </div>
      </div>
    );
  }
}

