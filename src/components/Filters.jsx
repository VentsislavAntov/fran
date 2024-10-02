import React, { useState } from 'react';

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

    console.log("Filters applied: ", filterData);  // Debugging: See if this is printed
    onChange(filterData);
  };

  return (
    <div className="filters-container">
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div>
        <label>Impressions:</label>
        <select
          value={impressionsOperator}
          onChange={(e) => setImpressionsOperator(e.target.value)}
        >
          <option value=">">Greater than</option>
          <option value="<">Less than</option>
          <option value="===">Equal to</option>
        </select>
        <input
          type="number"
          placeholder="Impressions"
          value={impressions}
          onChange={(e) => setImpressions(e.target.value)}
        />
      </div>

      <div>
        <label>Ad Requests:</label>
        <select
          value={adRequestsOperator}
          onChange={(e) => setAdRequestsOperator(e.target.value)}
        >
          <option value=">">Greater than</option>
          <option value="<">Less than</option>
          <option value="===">Equal to</option>
        </select>
        <input
          type="number"
          placeholder="Ad Requests"
          value={adRequests}
          onChange={(e) => setAdRequests(e.target.value)}
        />
      </div>

      <div>
        <label>Revenue:</label>
        <select
          value={revenueOperator}
          onChange={(e) => setRevenueOperator(e.target.value)}
        >
          <option value=">">Greater than</option>
          <option value="<">Less than</option>
          <option value="===">Equal to</option>
        </select>
        <input
          type="number"
          placeholder="Revenue"
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
        />
      </div>

      <button onClick={handleFilterSubmit}>Apply Filters</button>
    </div>
  );
};

export default Filters;
