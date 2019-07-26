import request from '../utils/request';

export async function current() {
  return request('/api/user/current');
}

export async function login(username, password) {
  return request('/api/user/login', {
    method: 'POST',
    type: 'json',
    body: JSON.stringify({ username, password }),
  });
}

export async function logout() {
  return request('/api/user/logout');
}
