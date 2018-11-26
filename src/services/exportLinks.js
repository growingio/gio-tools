import request from '../utils/request';

export async function exportLinksV2(ai, type, date) {
  return request(`/api/qs/export/status/${ai}/${type}/${date}`);
}

export function example() { }
