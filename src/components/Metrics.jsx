const Metrics = ({ data }) => {
  if (!data) return <p>No metrics available</p>;

  const { dailyImpressions, ad_requests, revenue } = data.metrics;

  return (
    <div className="metrics-container">
      <div className="metric-item">
        <h2>Impressions</h2>
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
  );
};

export default Metrics;
