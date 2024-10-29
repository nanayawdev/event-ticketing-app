import React from 'react';
import TicketsSold from './TicketsSold';
import GrossRevenue from './GrossRevenue';
import Commission from './Commission';
import NetRevenue from './NetRevenue';
import TotalPaidOut from './TotalPaidOut';
import BalanceToBePaid from './BalanceToBePaid';
import TotalSalesChart from './TotalSalesChart';
import './Overview.css';

const Overview = ({ data }) => {
  return (
    <div className="overview-container">
      <h1 className="overview-title">Overview</h1>
      <div className="overview-grid">
        <TicketsSold count={data.ticketsSold} />
        <GrossRevenue amount={data.grossRevenue} />
        <Commission percentage={data.commission} />
        <NetRevenue amount={data.netRevenue} />
        <TotalPaidOut amount={data.totalPaidOut} />
        <BalanceToBePaid amount={data.balanceToBePaid} />
      </div>
      <div className="total-sales-chart-container">
        <TotalSalesChart />
      </div>
    </div>
  );
};

export default Overview;
