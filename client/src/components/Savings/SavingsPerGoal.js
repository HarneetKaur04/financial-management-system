import React from 'react';
import { Bar } from 'react-chartjs-2';

const SavingsPerGoal = ({ allocatedSavings, handleSavingsToGoalsReport }) => {
  // Extract goal names and current saved amounts from allocatedSavings
  const labels = allocatedSavings?.map(goal => goal.goal_name);
  const savedAmounts = allocatedSavings?.map(goal => parseFloat(goal.current_amount_saved || 0));

  // Define dark colors for the bars
  const darkColors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 205, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Current Amount Saved',
        data: savedAmounts,
        backgroundColor: darkColors,
        borderColor: darkColors.map(color => color.replace('0.2', '1')),
        borderWidth: 1,
      },
    ],
  };

  // Define chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Current Amount Saved',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Goal Name',
        },
      },
    },
  };

  return (
    <div className='stats'>
      <h2>Savings Allocation Per Goal</h2>
      <Bar data={data} options={options} />
      <button onClick={() => handleSavingsToGoalsReport(true)}>See Full Report</button>
    </div>
  );
};

export default SavingsPerGoal;
