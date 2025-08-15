import axios from "axios";

const API_URL = "http://localhost:5000/api/expenses";

const getAuthHeader = () => {
  const token = localStorage.getItem("token"); 
  return { Authorization: `Bearer ${token}` };
};

export const getExpenses = () => axios.get(API_URL, { headers: getAuthHeader() });
export const addExpense = (data) =>
  axios.post(API_URL, data, {
    headers: { ...getAuthHeader(), "Content-Type": "application/json" }
  });
export const updateExpense = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, {
    headers: { ...getAuthHeader(), "Content-Type": "application/json" }
  });
export const deleteExpense = (id) => axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });

//  Add this function
export const getFilteredExpenses = (category, startDate, endDate) => {
  const params = {};
  if (category) params.category = category;
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  return axios.get(`${API_URL}/filter`, { params, headers: getAuthHeader() });
};