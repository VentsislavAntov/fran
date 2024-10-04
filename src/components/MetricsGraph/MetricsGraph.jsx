import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';
import './MetricsGraph.css';


const MetricsGraph = ({ data, dataKey, label }) => {
  if (!data || data.length === 0) {
    return <Typography>No data available for {label}.</Typography>;
  }

  return (
    <span data-testid="metrics-graph">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </span>
  );
};

export default MetricsGraph;
