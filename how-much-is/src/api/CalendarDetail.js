import axios from 'axios';
export const getTransactions = async () => {
  const response = await axios.get('http://localhost:3000/transactions');
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get('http://localhost:3000/categories');
  return response.data;
};
export const postTransactions = async (d) => {
  const response = await axios.post('http://localhost:3000/transactions', d);
  return response.data;
};
