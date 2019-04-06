import React, { Component } from 'react';
import DataOverview from "./components/DataOverview";
import FlowStatistics from "./components/FlowStatistics";
import LatestActivity from "./components/LatestActivity";
import './Dashboard.scss';

export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="dashboard-page">
        <DataOverview/>
        <FlowStatistics/>
        <LatestActivity />
      </div>
    );
  }
}
