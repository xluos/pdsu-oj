
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Breadcrumb } from '@alifd/next';
import { Link, withRouter } from 'react-router-dom';
import TestDataTable from "./components/TestDataTable";
import SelectProblem from "./components/SelectProblem";
import _ from 'lodash'

@withRouter
export default class ProblemTestData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      problemId: _.get(this.props, 'location.state.id', '')
    };
  }

  render () {
    return (
      <div className="ProblemTestData-page">
        <IceContainer>
          <Breadcrumb separator="/">
            <Breadcrumb.Item><Link to="/admin">Admin</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/admin/problem/list">Problem</Link></Breadcrumb.Item>
            <Breadcrumb.Item>TestData</Breadcrumb.Item>
          </Breadcrumb>
        </IceContainer>
        {
          this.state.problemId ? (
            <TestDataTable id={this.state.problemId}/>
          ) : (
            <SelectProblem onChange={() => {
              this.setState({
                problemId: val
              })
            }}/>
          )
        }
      </div>
    );
  }

}

