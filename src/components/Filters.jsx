const Filters = () => {
  return (
    <div className="filters-container">
      <label>Date Range:</label>
      <input type="date" name="startDate" />
      <input type="date" name="endDate" />
    </div>
  );
};

export default Filters;
