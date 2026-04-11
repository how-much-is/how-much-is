import axios from 'axios';

//조회
export const getTransactions = async () => {
  const response = await axios.get('http://localhost:3000/transactions');
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get('http://localhost:3000/categories');
  return response.data;
};

//추가
export const postTransactions = async (d) => {
  const response = await axios.post('http://localhost:3000/transactions', d);
  return response.data;
};

// 수정
export const putTransaction = async (id, data) => {
  const response = await axios.put(
    `http://localhost:3000/transactions/${id}`,
    data,
  );
  return response.data;
};

// 삭제
export const deleteTransaction = async (id) => {
  const response = await axios.delete(
    `http://localhost:3000/transactions/${id}`,
  );
  return response.data;
};
