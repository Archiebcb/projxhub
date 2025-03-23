// frontend/src/components/XRPChart.js
import React from 'react';
import { Container, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  Tooltip,
  Legend,
  LineElement,
  PointElement
} from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns'; // Needed for time scale
import { Chart } from 'react-chartjs-2';

// Register necessary Chart.js components
ChartJS.register(
  TimeScale,
  LinearScale,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CandlestickController,
  CandlestickElement
);

const XRPChart = () => {
  // Sample static data for a 4-hour candlestick chart
  const candlestickData = [
    { t: new Date("2025-03-18T00:00:00Z").getTime(), o: 1.20, h: 1.25, l: 1.18, c: 1.22 },
    { t: new Date("2025-03-18T04:00:00Z").getTime(), o: 1.22, h: 1.28, l: 1.21, c: 1.26 },
    { t: new Date("2025-03-18T08:00:00Z").getTime(), o: 1.26, h: 1.27, l: 1.23, c: 1.24 },
    { t: new Date("2025-03-18T12:00:00Z").getTime(), o: 1.24, h: 1.30, l: 1.24, c: 1.29 },
    { t: new Date("2025-03-18T16:00:00Z").getTime(), o: 1.29, h: 1.32, l: 1.27, c: 1.30 },
    { t: new Date("2025-03-18T20:00:00Z").getTime(), o: 1.30, h: 1.33, l: 1.29, c: 1.31 },
    { t: new Date("2025-03-19T00:00:00Z").getTime(), o: 1.31, h: 1.35, l: 1.30, c: 1.34 },
  ];

  // Our candlestick dataset
  const candlestickDataset = {
    label: 'XRP Candlestick',
    type: 'candlestick',
    // The data must be an array of objects with t, o, h, l, c keys
    data: candlestickData,
    // Tells Chart.js how to parse the candlestick data
    parsing: {
      xAxisKey: 't',     // x-axis is "t"
      open: 'o',         // open
      high: 'h',         // high
      low: 'l',          // low
      close: 'c'         // close
    }
  };

  // Calculate a simple 3-period moving average for demonstration
  const closePrices = candlestickData.map(point => point.c);
  const ma3Data = closePrices.map((_, i, arr) =>
    i < 2 ? null : (arr[i] + arr[i - 1] + arr[i - 2]) / 3
  );
  // Build an array of { t, y } points for the MA line
  const ma3Dataset = {
    label: 'MA (3)',
    type: 'line',
    data: candlestickData.map((point, i) => ({
      t: point.t,
      y: ma3Data[i]
    })),
    borderColor: 'yellow',
    borderWidth: 2,
    fill: false
  };

  // Sample RSI line
  const rsiValues = [null, null, 45, 50, 55, 60, 58];
  const rsiDataset = {
    label: 'RSI',
    type: 'line',
    data: candlestickData.map((point, i) => ({
      t: point.t,
      y: rsiValues[i]
    })),
    borderColor: 'red',
    borderWidth: 2,
    fill: false,
    yAxisID: 'y1'
  };

  // Combine all datasets
  const data = {
    datasets: [candlestickDataset, ma3Dataset, rsiDataset]
  };

  // Chart options
  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour'
        },
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255,255,255,0.1)'
        }
      },
      y: {
        position: 'left',
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255,255,255,0.1)'
        }
      },
      y1: {
        position: 'right',
        ticks: {
          color: 'red'
        },
        grid: {
          drawOnChartArea: false
        }
      }
    },
    plugins: {
      legend: {
        labels: { color: 'white' }
      }
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom color="primary">
        XRP 4-Hour Candle Chart
      </Typography>
      {/* Give the chart a fixed height so it's visible */}
      <div style={{ height: '500px' }}>
        <Chart data={data} options={options} />
      </div>
    </Container>
  );
};

export default XRPChart;
