import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

const IncomeExpenseSource = ({ type, categories, handleSourcesReport, onButtonClick}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (categories && categories.length > 0) {
      const labels = categories.map(category => category.category);
      const data = categories.map(category => parseFloat(category.total)); // Convert total to float

      const ctx = chartRef.current.getContext('2d');

      // Check if there's an existing chart instance and destroy it
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: type === 'income' ? 'bar' : 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Amount',
            data: data,
            backgroundColor: [
              'rgb(221, 117, 117)',
              'rgb(117, 126, 221)',
              'rgb(218, 221, 117)',
              'rgb(184, 221, 166)',
              'rgb(221, 117, 218)',
              'rgb(227, 166, 112)',
              'rgb(131, 223, 206)',
              'rgb(111, 94, 194)',
            ]
          }]
        },
        options: {
          responsive: false,
          plugins: {
            legend: {
              display: type === 'income' ? false : true,
              position: type === 'income' ? 'bottom' : 'right'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = typeof context.raw === 'number' ? context.raw : 0;
                  return label + ': $' + (parseFloat(value).toFixed(2));
                }
              }
            },
            datalabels: {
              display: true,
              color: 'black',
              anchor: 'end',
              align: 'end',
              formatter: function(value, context) {
                const label = context.chart.data.labels[context.dataIndex];
                const total = context.chart.data.datasets[0].data[context.dataIndex];
                const percentage = ((value / total) * 100).toFixed(2) + '%';
                return label + ': $' + value.toFixed(2) + ' (' + percentage + ')';
              }
            }
          }
        }
      });
    }
  }, [categories, type]);

  return (
    <div className='stats'>
      <h2>{type === 'income' ? 'Income Sources' : 'Spending Habits'}</h2>
      <canvas className={type === 'income' ? "chart-canvas" : "chart-canvas-pie"} ref={chartRef}></canvas>
      <button onClick={() => onButtonClick(type)}>See Full Report</button>
    </div>
  );
};

export default IncomeExpenseSource;
