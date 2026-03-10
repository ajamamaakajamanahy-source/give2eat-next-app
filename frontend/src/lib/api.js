import axios from 'axios';
import { supabase } from './supabase';

const api = axios.create({
  baseURL: (process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001') + '/api',
});

// Add a request interceptor to include the Supabase token
api.interceptors.request.use(async (config) => {
  // Check for demo token first
  const demoToken = localStorage.getItem('demo_token');
  if (demoToken) {
    config.headers.Authorization = `Bearer ${demoToken}`;
    return config;
  }

  // Then check Supabase session
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

export default api;
