const express = require('express');
const cors = require('cors'); // Import cors middleware
const app = express();
const port = 3001;
const fs = require('fs');
const path = require('path');

// Enable CORS for all routes and specify the origin
app.use(cors({ origin: 'http://localhost:3000' }));

// Load the metrics JSON data
const metricsFilePath = path.join(__dirname, 'metrics.json');

// Utility function to apply filters
const applyFilters = (data, filters) => {
  const {
    startDate,
    endDate,
    impressions,
    impressionsOperator,
    adRequests,
    adRequestsOperator,
    revenue,
    revenueOperator,
  } = filters;

  let filteredData = data.over_time;

  // Apply date filters
  if (startDate && endDate) {
    filteredData = filteredData.filter((entry) => {
      const entryDate = new Date(entry.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return entryDate >= start && entryDate <= end;
    });
  }

  // Apply Impressions filter
  if (impressions) {
    filteredData = filteredData.filter((entry) => {
      return applyOperator(entry.impressions, impressions, impressionsOperator);
    });
  }

  // Apply Ad Requests filter
  if (adRequests) {
    filteredData = filteredData.filter((entry) => {
      return applyOperator(entry.ad_requests, adRequests, adRequestsOperator);
    });
  }

  // Apply Revenue filter
  if (revenue) {
    filteredData = filteredData.filter((entry) => {
      return applyOperator(entry.revenue, revenue, revenueOperator);
    });
  }

  return filteredData;
};

// Utility to handle operator logic
const applyOperator = (fieldValue, filterValue, operator) => {
  filterValue = parseFloat(filterValue);
  switch (operator) {
    case '>':
      return fieldValue > filterValue;
    case '<':
      return fieldValue < filterValue;
    case '===':
      return fieldValue === filterValue;
    default:
      return true; // No filtering
  }
};

// API route to get filtered metrics
app.get('/api/metrics', (req, res) => {
  console.log('Request received with filters:', req.query);
  
  fs.readFile(metricsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to load metrics data' });
    }

    const metricsData = JSON.parse(data);
    const filters = {
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      impressions: req.query.impressions,
      impressionsOperator: req.query.impressionsOperator || '>',
      adRequests: req.query.adRequests,
      adRequestsOperator: req.query.adRequestsOperator || '>',
      revenue: req.query.revenue,
      revenueOperator: req.query.revenueOperator || '>',
    };

    // Apply filters to the over_time data
    const filteredMetrics = applyFilters(metricsData, filters);

    // Log filtered data for debugging
    console.log('Filtered metrics:', filteredMetrics);

    // Return the filtered data
    res.json({
      ...metricsData,
      over_time: filteredMetrics,
    });
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
