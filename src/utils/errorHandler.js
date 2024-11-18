export const handleApiError = (error) => {
  if (error.response) {
    return {
      message: error.response.data.message || 'Server error occurred',
      status: error.response.status,
    };
  } else if (error.request) {
    return {
      message: 'No response from server',
      status: 503,
    };
  }
  return {
    message: 'An error occurred',
    status: 500,
  };
}; 