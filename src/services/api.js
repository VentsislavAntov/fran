export const fetchMetrics = async (filters) => {
  try {
    const query = new URLSearchParams(filters).toString();
    console.log("Query being sent to the backend: ", query);  // Debugging: log the query
    const response = await fetch(`http://localhost:3001/api/metrics?${query}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching metrics:', error);
    throw error;
  }
};
