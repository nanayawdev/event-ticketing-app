import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardNavbar from './DashboardNavbar';
import TopNavbar from './TopNavbar';
import Profile from './Profile';
import Overview from './Overview';
import AddEventBlank from './AddEventBlank';
import AddEventDetails from './AddEventDetails';
import Settlements from './Settlements';
import Tickets from './Tickets';
import './Dashboard.css';

// Mock data for the Overview component
const mockOverviewData = {
  ticketsSold: 1000,
  grossRevenue: 500,
  commission: 10,
  netRevenue: 450,
  totalPaidOut: 400,
  balanceToBePaid: 50,
  withdrawnSettlements: 0,
  pendingSettlement: 0,
  readyToWithdraw: 0
};

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <DashboardNavbar />
      <div className="dashboard-main">
        <TopNavbar />
        <main className="dashboard-content">
          <Routes>
            <Route path="/" element={<Overview data={mockOverviewData} />} />
            <Route path="create-event" element={<div className="center-content"><AddEventDetails /></div>} />
            <Route path="manage-events" element={<div className="center-content"><AddEventBlank /></div>} />
            <Route path="attendees" element={
              <div className="center-content">
                <AddEventBlank />
              </div>
            } />
            <Route path="analytics" element={<div>Analytics Content</div>} />
            <Route path="tickets" element={
              <div className="center-content">
                <Tickets />
              </div>
            } />
            <Route path="settlements" element={<Settlements 
              grossRevenue={mockOverviewData.grossRevenue}
              totalPaidOut={mockOverviewData.totalPaidOut}
              balanceToBePaid={mockOverviewData.balanceToBePaid}
              withdrawnSettlements={mockOverviewData.withdrawnSettlements}
              pendingSettlement={mockOverviewData.pendingSettlement}
              readyToWithdraw={mockOverviewData.readyToWithdraw}
              addSettlementMethod={() => {}}
            />} />
            <Route path="settings" element={<div>Settings Content</div>} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
