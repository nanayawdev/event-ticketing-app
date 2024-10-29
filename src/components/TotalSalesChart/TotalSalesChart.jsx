import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './TotalSalesChart.css';

const generateData = (startDate, days) => {
  const data = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    data.push({
      date: `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`,
      sales: Math.floor(Math.random() * 300) + 100
    });
  }
  return data;
};

const TotalSalesChart = () => {
  const [timeFrame, setTimeFrame] = useState('lastWeek');
  const [data, setData] = useState(() => {
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 11);
    return generateData(lastWeek, 12);
  });

  const handleTimeFrameChange = (event) => {
    const selectedTimeFrame = event.target.value;
    setTimeFrame(selectedTimeFrame);

    const today = new Date();
    let startDate;
    let days;

    switch (selectedTimeFrame) {
      case 'lastWeek':
        startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 11);
        days = 12;
        break;
      case 'lastMonth':
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        days = 30;
        break;
      case 'currentYear':
        startDate = new Date(today.getFullYear(), 0, 1);
        days = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
        break;
      default:
        startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 11);
        days = 12;
    }

    setData(generateData(startDate, days));
  };

  const maxSales = Math.max(...data.map(item => item.sales));

  return (
    <div className="total-sales-chart">
      <div className="chart-header">
        <h2>Total Sales</h2>
        <select className="time-select" value={timeFrame} onChange={handleTimeFrameChange}>
          <option value="lastWeek">Last week</option>
          <option value="lastMonth">Last month</option>
          <option value="currentYear">Current year</option>
        </select>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barSize={20}>
            <XAxis dataKey="date" axisLine={false} tickLine={false} />
            <YAxis hide={true} />
            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="custom-tooltip">
                      <p className="label">${payload[0].value}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="sales">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.sales === maxSales ? '#4A3AFF' : '#E5E5FF'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalSalesChart;
