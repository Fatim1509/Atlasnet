import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const fetchStats = async () => {
  const { data } = await api.get('/stats');
  return data;
};

export const fetchTimeline = async (days = 7) => {
  const { data } = await api.get(`/timeline?days=${days}`);
  return data;
};

export const fetchBehavior = async () => {
  const { data } = await api.get('/behavior');
  return data;
};

export const fetchHeatmap = async () => {
  const { data } = await api.get('/heatmap');
  return data;
};

export const fetchReplay = async (scenario = 'brute_force') => {
  const { data } = await api.get(`/replay?scenario=${scenario}`);
  return data;
};

export const fetchEvents = async (limit = 100, offset = 0, severity?: string) => {
  const params: any = { limit, offset };
  if (severity) params.severity = severity;
  const { data } = await api.get('/events', { params });
  return data;
};

export const fetchTopIPs = async (limit = 10) => {
  const { data } = await api.get(`/top-ips?limit=${limit}`);
  return data;
};

export default api;
