export const fetchMetrics = async () => {
  try {
    const response = await fetch('/metrics.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching metrics: ", error);
    throw error;
  }
};
