import React, { useState, useEffect } from 'react';
import { Grid2, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Filters from '../Filters.jsx';
import { fetchMetrics } from '../../services/api.js';
import MetricsGraph from '../MetricsGraph/MetricsGraph.jsx';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    startDate: '',
    impressions: '',
    impressionsOperator: '>',
    adRequests: '',
    adRequestsOperator: '>',
    revenue: '',
    revenueOperator: '>',
  });
  const [filteredData, setFilteredData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setLoading(true);
        const response = await fetchMetrics(filters);
        setData(response);
        setFilteredData(response);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    loadMetrics();
  }, [filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
  setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage)); 
  };

  const handleNextPage = () => {
    const totalItems = data?.over_time.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const paginatedData = filteredData?.over_time.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Grid2 container spacing={3} sx={{ mt: 4, ml: 2 }}>
      {/* Filters Section */}
      <Grid2 xs={12} md={3}>
        <Typography variant="h5" component="h2" gutterBottom>Filters</Typography>
        <Filters onChange={handleFiltersChange} />
      </Grid2>

      {/* Metrics Section */}
      <Grid2 xs={12} md={6}>
        <Typography variant="h5" component="h2" gutterBottom>Totals</Typography>
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Metric</strong></TableCell>
                <TableCell><strong>Value</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Daily Impressions</TableCell>
                <TableCell>{data.metrics.dailyImpressions}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ad Requests</TableCell>
                <TableCell>{data.metrics.ad_requests}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Revenue</TableCell>
                <TableCell>${data.metrics.revenue}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h5" component="h2" gutterBottom>Over Time Metrics</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Impressions</TableCell>
                <TableCell>Ad Requests</TableCell>
                <TableCell>Revenue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData?.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.impressions}</TableCell>
                  <TableCell>{entry.ad_requests}</TableCell>
                  <TableCell>${entry.revenue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid2 container justifyContent="center" spacing={2} sx={{ mt: 2 }}>
          <Button onClick={handlePreviousPage} disabled={currentPage === 1} variant="contained" color="primary">
            PREVIOUS
          </Button>
          <Button onClick={handleNextPage} variant="contained" color="primary">
            NEXT
          </Button>
        </Grid2>
      </Grid2>

      {/* Graph Section */}
      <Grid2 xs={12}>
        <Grid2 container spacing={3}>
          <Grid2 xs={4}>
            <Typography variant="h5" component="h2" gutterBottom>Impressions Over Time</Typography>
            <MetricsGraph data={filteredData?.over_time} dataKey="impressions" label="Impressions" />
          </Grid2>
          <Grid2 xs={4}>
            <Typography variant="h5" component="h2" gutterBottom>Ad Requests Over Time</Typography>
            <MetricsGraph data={filteredData?.over_time} dataKey="ad_requests" label="Ad Requests" />
          </Grid2>
          <Grid2 xs={4}>
            <Typography variant="h5" component="h2" gutterBottom>Revenue Over Time</Typography>
            <MetricsGraph data={filteredData?.over_time} dataKey="revenue" label="Revenue" />
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default Dashboard;