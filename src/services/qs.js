import request from '../utils/request';

export async function testSample(params) {
  return request('/api/qs/test/sample', {
    method: 'POST',
    type: 'json',
    body: JSON.stringify(params),
  });
}

export async function testSample2() {
  return request('/api/qs/test/sample');
}
