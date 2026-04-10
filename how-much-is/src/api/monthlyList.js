import axios from './axios';

export const monthlyList = async () => {
  try {
    const response = await axios.get('/transactions');
    return response;
  } catch (error) {
    console.error('유저 조회 실패:', error);
  }
};

export const pickMonthlyList = async (payload) => {
  try {
    const response = await monthlyList();
    return response.data.filter(u => u.date.startsWith(payload));
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get('/categories');
    return response;
  } catch (error) {
    console.error(error);
  }
};
