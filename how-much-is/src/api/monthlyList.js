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

export const getWeekRanges = (year, month) => {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const lastDate = new Date(year, month, 0).getDate();

  const ranges = [];
  let week = 1;
  let start = 1;
  let end = 7 - firstDay;
  ranges.push({ week, start, end: Math.min(end, lastDate) });
  week++;
  start = end + 1;
  while (start <= lastDate) {
    end = start + 6;
    ranges.push({ week, start, end: Math.min(end, lastDate) });
    start = end + 1;
    week++;
  }
  return ranges;
};

export const getWeeklyExpenseTotals = (response, year, month, conditionFn) => {
  const weekRanges = getWeekRanges(year, month);
  return weekRanges.map((range) => {
    return response.filter((u) => {
      const date = new Date(u.date);
      const itemDay = date.getDate();
      if (range.start <= itemDay && range.end >= itemDay && conditionFn(u)) {
        return u.amount;
      }
      return 0;
    });
  });
};