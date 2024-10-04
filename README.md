
# Dashboard Web Application

This project is a web application that allows users to view metrics and apply filters for data. It is built using **React**, with several important architectural decisions aimed at optimizing performance and user experience.

## Getting Started

### Installation

Before running the app, ensure you have **Yarn** installed. You can install dependencies by running:

```bash
yarn install
```

### Running the Application

To start the application in development mode, use the following command:

```bash
yarn start
```

This will launch the app and open a new browser window. The command starts both the frontend and the backend (express server) using concurrently. The app will reload automatically whenever you make code changes.

### Running Tests

To execute the test suite, run:

```bash
yarn test
```

This will run all the unit tests for the application, primarily focusing on the **Dashboard** component. It uses **Jest** for testing and includes tests for filtering, rendering data, handling API errors, and pagination.

---

## Key Features and Architectural Decisions

### 1. Express Server for API Requests

An **Express** server is set up in the backend to handle API requests. The server exposes a `GET` API that allows the frontend to pass queries for filtering metrics. The filtered data is processed and returned as JSON.

- **API Endpoint**: The API is structured to accept queries that correspond to the filters applied in the dashboard.
- This API provides the data for the dashboard and processes user-applied filters to fetch relevant results.

### 2. Express Server for API Requests

The application uses a React component library of our choice (**Material-UI**) for the UI components and layout.

### 3. Local Storage for Authentication

The application uses **localStorage** for managing user authentication status. Upon login, a flag (`isAuthenticated`) is stored in localStorage to persist the user's authentication status across sessions.

- **Usage**: The authentication status is checked on page load to automatically log users in if they were previously authenticated.
- LocalStorage ensures that users do not have to log in repeatedly unless they explicitly log out.

### 4. Lazy Loading of Dashboard

The **Dashboard** component is lazily loaded using **React’s Suspense**. This ensures that the dashboard is only loaded when needed, reducing the initial bundle size and improving page load performance.

- **Lazy Loading**: This allows for better performance by splitting code and loading the dashboard component asynchronously.
- **Loading Spinner**: During lazy loading, a loading spinner is displayed in the middle of the screen to inform users that the content is being fetched.

### 5. Comprehensive Tests for the Dashboard

There are extensive tests for the **Dashboard** component that cover most of the core functionalities. The tests include:

- **Rendering Data**: Ensuring that metrics and graphs are rendered properly after fetching data.
- **Filters**: Validating that filters work correctly for impressions, ad requests, revenue, and date ranges.
- **Pagination**: Verifying that pagination works across filtered data.
- **Error Handling**: Simulating API failures and ensuring the app handles them gracefully.

The tests ensure that any changes to the core logic of the dashboard don’t introduce regressions.

### 6. Minification with Create-React-App

The project is built with **Create-React-App**, which automatically includes minification during the production build. This helps in reducing the overall bundle size and ensures faster load times for users in production.

### 7. Key Architectural Decisions

- **Component Structure**: The project is structured into well-defined components to ensure modularity and maintainability. Each component has a specific role, such as filters, data presentation, or graphs.
  
- **State Management**: The state is managed using React's built-in `useState` and `useEffect` hooks, ensuring lightweight and efficient data handling.

- **Testing Strategy**: Tests are written to cover the critical paths, especially around data rendering, filtering, and pagination. This guarantees the functionality of the most important parts of the application.

- **Responsive Design**: The dashboard is responsive and adjusts based on screen size, ensuring usability on both desktop and mobile devices.

---

## Suggestions for Potential Improvements

While the application is functional and covers the core use cases, several improvements could be made:

1. **Improved State Management**: Introducing a global state management solution like **Redux** or **Context API** could help centralize and simplify state management across components, especially as the app grows.

2. **Pagination Optimization**: Instead of fetching all data at once, we could be implementing server-side pagination to handle large datasets more efficiently and reduce the initial load time.

3. **Enhanced Security**: Currently, authentication relies on localStorage, which can be vulnerable. Moving to more secure options for storing session tokens would improve security.

4. **Caching Data**: Adding caching mechanisms for frequently requested data could further improve the app’s performance by reducing redundant API calls.

5. **Accessibility Improvements**: Improving the app to be fully accessible for screen readers and keyboard navigation.

6. **Error Reporting**: Implement more advanced error reporting mechanisms (e.g., Sentry) to capture and report runtime errors effectively.

---

## Order of Priorities for Development

If time was limited, here’s how I would prioritize the development of the web application:

1. **Core Functionality**: Ensure that the data fetching, filtering, and rendering functionalities are stable and well-tested.
   
2. **Authentication & Security**: Ensure that authentication works and that local storage handles the `isAuthenticated` flag correctly. Add a logout button.

3. **Testing**: Write tests for the most critical functionalities—filtering, data rendering, and pagination—to catch any regressions early.

4. **Performance Optimization**: Use lazy loading for the dashboard and minify assets for production to optimize page load time.

5. **Other improvements**: IAdvanced er.

6. **Improvement Suggestions**: If time permits, implement enhancements like better state management, improved security, and pagination optimization.
