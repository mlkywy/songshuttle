const convertEndpointParams = (endpoint, params) => {
  let newEndpoint = endpoint;
  for (const [key, value] of Object.entries(params)) {
    newEndpoint = newEndpoint.replace(`:${key}`, value);
  }
  return newEndpoint;
};

export default convertEndpointParams;
