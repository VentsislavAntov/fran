import React, { useState } from 'react';
import { Grid2, TextField, Button, MenuItem, Typography } from '@mui/material';

const Filters = ({ onChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [impressions, setImpressions] = useState('');
  const [impressionsOperator, setImpressionsOperator] = useState('>');
  const [adRequests, setAdRequests] = useState('');
  const [adRequestsOperator, setAdRequestsOperator] = useState('>');
  const [revenue, setRevenue] = useState('');
  const [revenueOperator, setRevenueOperator] = useState('>');

  const handleFilterSubmit = () => {
    const filterData = {
      startDate,
      endDate,
      impressions,
      impressionsOperator,
      adRequests,
      adRequestsOperator,
      revenue,
      revenueOperator,
    };
    onChange(filterData);
  };

  return (
    <Grid2 container spacing={2} direction="column">
      <Grid2 item xs={12}>
        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          Date Range
        </Typography>
      </Grid2>
      <Grid2 container spacing={2}>
        <Grid2 item xs={6}>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            data-testid="start-date-input"
          />
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            data-testid="end-date-input"
          />
        </Grid2>
      </Grid2>

      <Grid2 item xs={12}>
        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          Parameters
        </Typography>
      </Grid2>
      <Grid2 container spacing={2}>
        <Grid2 item xs={6}>
          <span data-testid="impressions-operator">
            <TextField
              label="Impressions Operator"
              select
              value={impressionsOperator}
              onChange={(e) => setImpressionsOperator(e.target.value)}
              fullWidth
            >
              <MenuItem value=">">Greater than</MenuItem>
              <MenuItem value="<">Less than</MenuItem>
              <MenuItem value="===">Equal to</MenuItem>
            </TextField>
          </span>
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            data-testid="impressions-input"
            label="Impressions"
            type="number"
            value={impressions}
            onChange={(e) => setImpressions(e.target.value)}
            fullWidth
          />
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2}>
        <Grid2 item xs={6}>
          <span data-testid="adrequests-operator">
            <TextField
              data-testid="adrequests-operator"
              label="Ad Requests Operator"
              select
              value={adRequestsOperator}
              onChange={(e) => setAdRequestsOperator(e.target.value)}
              fullWidth
            >
              <MenuItem value=">">Greater than</MenuItem>
              <MenuItem value="<">Less than</MenuItem>
              <MenuItem value="===">Equal to</MenuItem>
            </TextField>
          </span>
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
          data-testid="adrequests-input"
            label="Ad Requests"
            type="number"
            value={adRequests}
            onChange={(e) => setAdRequests(e.target.value)}
            fullWidth
          />
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2}>
        <Grid2 item xs={6}>
          <TextField
            label="Revenue Operator"
            select
            value={revenueOperator}
            onChange={(e) => setRevenueOperator(e.target.value)}
            fullWidth
          >
            <MenuItem value=">">Greater than</MenuItem>
            <MenuItem value="<">Less than</MenuItem>
            <MenuItem value="===">Equal to</MenuItem>
          </TextField>
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            label="Revenue"
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            fullWidth
          />
        </Grid2>
      </Grid2>

      <Grid2 item xs={12}>
        <Button onClick={handleFilterSubmit} variant="contained" color="primary" fullWidth>
          APPLY FILTERS
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default Filters;
