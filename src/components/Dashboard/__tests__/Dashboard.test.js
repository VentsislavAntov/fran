/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { fetchMetrics } from '../../../services/api';

// Mocking the fetchMetrics function to avoid actual API calls
jest.mock('../../../services/api', () => ({
  fetchMetrics: jest.fn(),
}));

// Mock ResizeObserver globally
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const mockMetrics = {
  metrics: {
    dailyImpressions: 29200,
    ad_requests: 50000,
    revenue: 325.00,
  },
  over_time: [
    { date: '2024-09-01', impressions: 10001, ad_requests: 30000, revenue: 288.00 },
    { date: '2024-09-08', impressions: 11521, ad_requests: 17028, revenue: 288.00 },
    { date: '2024-09-11', impressions: 16000, ad_requests: 25000, revenue: 340.00 },
    { date: '2024-09-12', impressions: 16001, ad_requests: 25001, revenue: 340.00 },
    { date: '2024-09-13', impressions: 16002, ad_requests: 25002, revenue: 340.00 },
    { date: '2024-09-14', impressions: 16003, ad_requests: 25003, revenue: 340.00 },
  ],
};

// Tests for the Dashboard component
describe('Dashboard Component', () => {
  beforeEach(() => {
    fetchMetrics.mockResolvedValue(mockMetrics); // Mock the API call to return the mock metrics data
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', async () => {
    render(<Dashboard />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test('renders the totals data after fetching', async () => {
    render(<Dashboard />);

    // Use findByText to wait until the text is present in the DOM
    const impressions = await screen.findByText(/daily impressions/i);
    expect(impressions).toBeInTheDocument();

    // Check if the fetched data is rendered correctly
    expect(screen.getByText('29200')).toBeInTheDocument(); // Daily Impressions
    expect(screen.getByText('50000')).toBeInTheDocument(); // Ad Requests
    expect(screen.getByText('$325')).toBeInTheDocument();  // Revenue
  });

  test('renders over time metrics and pagination works', async () => {
    render(<Dashboard />);

    const firstDate = await screen.findByText('2024-09-08');
    expect(firstDate).toBeInTheDocument(); // First row of over time metrics

    // Simulate clicking the next page
    fireEvent.click(screen.getByText(/next/i));

    const secondDate = await screen.findByText('2024-09-14');
    expect(secondDate).toBeInTheDocument(); // Second row of over time metrics
  });

  test('filters metrics by date range and renders updated results', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/daily impressions/i)).toBeInTheDocument();
    });

    // Set the start date and end date
    const startDateInput = screen.getByTestId('start-date-input').querySelector('input');;
    fireEvent.change(startDateInput, { target: { value: '2024-09-10' } });

    const endDateInput = screen.getByTestId('end-date-input').querySelector('input');;
    fireEvent.change(endDateInput, { target: { value: '2024-09-11' } });

    // Apply filters
    fireEvent.click(screen.getByText(/apply filters/i));

    // Check that the data within the date range is displayed
    await waitFor(() => {
      expect(screen.queryByText('11521')).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('16000')).toBeInTheDocument();
    });
  });

  test('filters metrics with multiple parameter combinations and renders updated results', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/daily impressions/i)).toBeInTheDocument();
    });

    // Set Impressions filter
    const impressionsInput = screen.getByTestId('impressions-input').querySelector('input');
    fireEvent.change(impressionsInput, { target: { value: '15000' } });


    const adRequestsInput = screen.getByTestId('adrequests-input').querySelector('input');
    fireEvent.change(adRequestsInput, { target: { value: '29000' } });

    // Apply filters
    fireEvent.click(screen.getByText(/apply filters/i));

    // Wait for filtered results to show
    await waitFor(() => {
      expect(screen.queryByText('11521')).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText('16000')).not.toBeInTheDocument();
    });
  });

  test('filters metrics data and renders updated results', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/daily impressions/i)).toBeInTheDocument();
    });

    
    // Input the impressions value
    const impressionsInput = screen.getByTestId('impressions-input').querySelector('input');
    fireEvent.change(impressionsInput, { target: { value: '15000' } });

    // Apply filters
    fireEvent.click(screen.getByText(/apply filters/i));

    // Wait for the filtered results to show
    await waitFor(() => {
      expect(screen.queryByText('10001')).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('16000')).toBeInTheDocument(); // Check filtered results
    });
  });

  test('renders three graphs correctly', async () => {
    render(<Dashboard />);

    // Wait for the graphs to be rendered
    await waitFor(() => {
      // Check that there are three spans with the data-testid="metrics-graph"
      const graphs = screen.getAllByTestId('metrics-graph');
      expect(graphs).toHaveLength(3);
    });
  });

  test('handles API fetch error gracefully', async () => {
    fetchMetrics.mockRejectedValue(new Error('Failed to fetch data'));

    render(<Dashboard />);

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch data/i)).toBeInTheDocument();
    });
  });
});
