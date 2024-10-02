import React, { useState, useEffect } from 'react';
import Metrics from './Metrics.jsx';
import Filters from './Filters.jsx';
import { fetchMetrics } from '../services/api';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    impressions: '',
    impressionsOperator: '>',
    adRequests: '',
    adRequestsOperator: '>',
    revenue: '',
    revenueOperator: '>',
  });
  const [filteredData, setFilteredData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Ensure useEffect runs whenever 'filters' changes
  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setLoading(true);
        console.log("Calling fetchMetrics with filters: ", filters);  // Debugging
        const response = await fetchMetrics(filters);  // Fetch data based on filters
        console.log("Response from API: ", response);  // Debugging

        setData(response);
        setFilteredData(response);  // Set filtered data after response is received
        setLoading(false);
      } catch (error) {
        console.error('Error fetching metrics: ', error);  // Debugging
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    loadMetrics();
  }, [filters]);  // Listen for changes in filters

  const handleFiltersChange = (newFilters) => {
    console.log("Received filters from Filters component: ", newFilters);  // Debugging
    setFilters(newFilters);  // Update filters when user applies them
    setCurrentPage(1);  // Reset to the first page when filters are applied
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage, 1));
  };

  const handleNextPage = () => {
    const totalItems = data?.over_time.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>FRAN Dashboard</h1>
      <Filters onChange={handleFiltersChange} />
      {filteredData ? <Metrics data={filteredData} /> : <p>No data available</p>}
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default Dashboard;
