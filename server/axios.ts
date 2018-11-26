import axios from 'axios-https-proxy-fix';

function handle() {
  const proxy = process.env.http_proxy;
  console.log(proxy);
  if (!!proxy) {
    const url = require('url');
    const p = url.parse(proxy);
    return axios.create({
      proxy: {
        host: p.hostname,
        port: p.port,
      },
    });
  }
  return axios;
}

export default handle();
