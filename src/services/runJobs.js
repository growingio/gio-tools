import request from '../utils/request';

export async function queryRunJobs() {
  return request('/api/qs/stat/runjobs');
}

export function example() { }
