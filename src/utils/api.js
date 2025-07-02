/**
 * API Utility for making HTTP requests
 * Reads configuration from environment variables
 */

// Get API configuration from environment variables
// const API_DOMAIN = import.meta.env.VITE_API_DOMAIN || 'http://localhost:3000';
const API_DOMAIN = 'https://api.hjz.ai';
const API_VERSION = import.meta.env.VITE_API_VERSION || 'v1';
const API_KEY = import.meta.env.VITE_API_KEY;

// Debug: Log the environment variables

// Base API URL - for hjz.ai API, we don't need /api/v1 prefix
const BASE_URL = API_DOMAIN.includes('hjz.ai')
  ? API_DOMAIN
  : `${API_DOMAIN}/api/${API_VERSION}`;

/**
 * Default headers for API requests
 */
const getDefaultHeaders = (customHeaders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  // Add API key if available
  if (API_KEY) {
    headers['Authorization'] = `Bearer ${API_KEY}`;
  }

  return headers;
};

/**
 * Handle API response
 */
const handleResponse = async response => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  // Check if response has content
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
};

/**
 * GET request
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - Response data
 */
export const get = async (endpoint, options = {}) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: getDefaultHeaders(options.headers),
      ...options,
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('GET request failed:', error);
    throw error;
  }
};

/**
 * POST request
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} data - Data to send
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - Response data
 */
export const post = async (endpoint, data = {}, options = {}) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: getDefaultHeaders(options.headers),
      body: JSON.stringify(data),
      ...options,
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('POST request failed:', error);
    throw error;
  }
};

/**
 * PUT request
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} data - Data to send
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - Response data
 */
export const put = async (endpoint, data = {}, options = {}) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: getDefaultHeaders(options.headers),
      body: JSON.stringify(data),
      ...options,
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('PUT request failed:', error);
    throw error;
  }
};

/**
 * DELETE request
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - Response data
 */
export const del = async (endpoint, options = {}) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: getDefaultHeaders(options.headers),
      ...options,
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('DELETE request failed:', error);
    throw error;
  }
};

/**
 * Generic request method
 * @param {string} method - HTTP method
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} data - Data to send (for POST, PUT, PATCH)
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - Response data
 */
export const request = async (method, endpoint, data = null, options = {}) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const config = {
      method: method.toUpperCase(),
      headers: getDefaultHeaders(options.headers),
      ...options,
    };

    if (data && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    console.error(`${method} request failed:`, error);
    throw error;
  }
};

// Export the base URL for reference
export { BASE_URL, API_DOMAIN, API_VERSION };
