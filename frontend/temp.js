import React from 'react';
import DashboardCard from './DashboardCard';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <DashboardCard title="Total Users" value="1000" />
      <DashboardCard title="Revenue" value="$5000" />
      {/* Add more DashboardCard components as needed */}
    </div>
  );
};

export default Dashboard;
