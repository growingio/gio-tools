import axios from 'axios-https-proxy-fix';

/**
 * proxy 相关的 issue: https://github.com/axios/axios/issues/925
 */
function handle() {
  const proxy = process.env.http_proxy;
  if (!!proxy) {
    const url = require('url');
    const p = url.parse(proxy);
    return axios.create({
      proxy: {
        host: p.hostname,
        port: p.port,
      },
      timeout: 2000,
    });
  }
  return axios;
}

export default handle();
