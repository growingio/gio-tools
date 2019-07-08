import * as path from 'path';

export default {
  // query service 配置
  qs: {
    server: [
      { name: 'm6qs1', address: '10.10.4.31:6060'},
      { name: 'm6qs2', address: '10.10.4.32:6060'},
      { name: 'm6qs3', address: '10.10.4.33:6060'},
      { name: 'm6qs4', address: '10.10.4.34:6060'},
    ],
    db: {
      path: path.resolve(__dirname, '../.nedb'),
    },
  },
};
