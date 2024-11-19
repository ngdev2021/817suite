import React from 'react';
import WorkflowList from './WorkflowList';
import FunnelList from './FunnelList';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <WorkflowList />
      <FunnelList />
    </div>
  );
};

export default Dashboard;
