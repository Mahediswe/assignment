import axios from "axios";

const API_URL = "http://localhost:5000/api/expenses";

export const getExpenses = () => axios.get(API_URL);
export const deleteExpense = (id) => axios.delete(`${API_URL}/${id}`);
export const updateExpense = (id, updatedData) => axios.put(`${API_URL}/${id}`, updatedData);
export const addExpense = (data) => axios.post(API_URL, data);

export const getFilteredExpenses = async (category, startDate, endDate) => {
  const params = {};
  if (category) params.category = category;
  if (startDate && endDate) {
    params.startDate = startDate;
    params.endDate = endDate;
  }
  return axios.get(`${API_URL}/filter`, { params });
};