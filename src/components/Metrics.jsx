const Metrics = ({ data }) => {
  if (!data) return <p>No metrics available</p>;

  const { dailyImpressions, ad_requests, revenue } = data.metrics;
  const { over_time } = data;

  return (
    <div>
      <div className="metrics-container">
        <div className="metric-item">
          <h2>Daily Impressions</h2>
          <p>{dailyImpressions}</p>
        </div>
        <div className="metric-item">
          <h2>Ad Requests</h2>
          <p>{ad_requests}</p>
        </div>
        <div className="metric-item">
          <h2>Revenue</h2>
          <p>${revenue}</p>
        </div>
      </div>

      <h3>Over Time Metrics (Page {data.currentPage})</h3>
      <ul>
        {over_time.map((entry, index) => (
          <li key={index}>
            Date: {entry.date}, Impressions: {entry.impressions}, Ad Requests: {entry.ad_requests}, Revenue: ${entry.revenue}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Metrics;
