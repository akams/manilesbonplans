export const getHeaders = (jwtToken: string|undefined) => ({
  Authorization: `Bearer ${jwtToken}`,
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

