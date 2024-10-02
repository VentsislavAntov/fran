import React, { useState, useEffect } from 'react';
import Metrics from './Metrics';
import Filters from './Filters';
import { fetchMetrics } from '../services/api';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMetrics()
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>FRAN Dashboard</h1>
      <Filters />
      <Metrics data={data} />
    </div>
  );
};

export default Dashboard;
