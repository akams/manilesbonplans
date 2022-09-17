export const getHeaders = (jwtToken: string) => ({
  Authorization: `Bearer ${jwtToken}`,
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

