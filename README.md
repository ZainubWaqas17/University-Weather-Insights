# University Weather Insights

A JavaScript-based project that combines real-time weather and geographical data APIs to fetch and analyze the average temperature near major universities. It also includes utility functions and robust testing to validate location and data accuracy.

## Features

- **Geolocation Lookup**: Uses a query string (e.g., "University of Massachusetts") to fetch precise latitude/longitude data.

- **Weather Data Fetching**: Retrieves hourly temperature data (in Fahrenheit) based on geographic coordinates.

- **University Name Matching**: Queries a university database and applies optional name transformation logic to improve geolocation accuracy.

- **Average Temperature Calculation**: Computes average hourly temperature readings for each university and returns a combined overall average.

- **Unit Testing**: Includes comprehensive Jest-based tests for data validation, error handling, and sorting logic.

## Project Structure

| File                       | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| `fetchCurrentTemperature.js` | Fetches hourly temperature data from a remote API and checks if the average exceeds a threshold. |
| `fetchGeoCoord.js`           | Resolves place names to geographic coordinates and validates location importance. |
| `fetchUniversity.test.js`    | Contains Jest unit tests for university name matching and data ordering logic. |
| `UniversityWeather.js`       | Integrates all modules to fetch average temperatures for specified universities, including UMass and UMich. |
