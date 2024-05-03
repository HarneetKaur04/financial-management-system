import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns'; //

const SavingsRate = ({ savingsRateData }) => {
  // Convert savings_rate values to numbers
  const data = savingsRateData.map(entry => ({
    date: new Date(entry.date), //
    savings_rate: parseFloat(entry.savings_rate)
  }));

  const chartData = {
    labels: data.map(entry => entry.date),
    datasets: [
      {
        label: 'Savings Rate',
        data: data.map(entry => entry.savings_rate),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: { 
          parser: 'date-fns',
          unit: 'day'
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Savings Rate (%)'
        }
      }
    }
  };

  return (
    <div>
      <h2>Savings Rate</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SavingsRate;
