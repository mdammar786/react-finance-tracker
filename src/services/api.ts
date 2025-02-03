import { API_BASE_URL } from '../utils/constants';

interface RequestOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const url = API_BASE_URL + endpoint;
  const config: RequestInit = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };
  if (options.body) {
    config.body = JSON.stringify(options.body);
  }
  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error('Request failed: ' + response.status);
  }
  return response.json();
}

export async function fetchTransactions(params?: Record<string, string>) {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  return request<any[]>('/transactions' + query);
}

export async function createTransaction(data: unknown) {
  return request('/transactions', { method: 'POST', body: data });
}

export async function updateTransaction(id: string, data: unknown) {
  return request('/transactions/' + id, { method: 'PUT', body: data });
}

export async function deleteTransaction(id: string) {
  return request('/transactions/' + id, { method: 'DELETE' });
}

export async function fetchBudgets() {
  return request<any[]>('/budgets');
}

export async function updateBudget(id: string, data: unknown) {
  return request('/budgets/' + id, { method: 'PUT', body: data });
}

export async function loginRequest(credentials: { email: string; password: string }) {
  return request<{ token: string; user: any }>('/auth/login', { method: 'POST', body: credentials });
}

