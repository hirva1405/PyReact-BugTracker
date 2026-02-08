import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const registerUser = (userData) => axios.post(`${API_URL}/users/`, userData);
export const loginUser = (params) => axios.post(`${API_URL}/users/login`, params);
export const getIssues = (userId) => axios.get(`${API_URL}/issues/?user_id=${userId}`);
export const createIssue = (issueData, userId) => axios.post(`${API_URL}/issues/?user_id=${userId}`, issueData);
export const updateIssue = (id, status) => axios.put(`${API_URL}/issues/${id}?status=${status}`);
export const deleteIssue = (id) => axios.delete(`${API_URL}/issues/${id}`);