import axios from './axios';

export const monthlyList = async () => {
  try {
    const response = await axios.get('/transactions');
    return response;
  } catch (error) {
    console.error('유저 조회 실패:', error);
  }
};
