import path from 'path';
// const pxtorem = require('postcss-pxtorem');

export default {
  publicPath: "/",
  entry: 'src/index.js',
  disableCSSModules: false,
  ignoreMomentLocale: true,
  theme: "./theme.config.js",
  define: {
    'process.env.NODE_ENV': (process.env.NODE_ENV === 'production') ? 'production' : 'development'
  },
  alias: {
    cmt: path.resolve(__dirname, 'src/components/'), // 公共组件
    icons: path.resolve(__dirname, 'src/assets/icons/'), // icon 图标
  },
  html: {
    template: './src/index.ejs',
  },
  publicPath: '/',
  // extraPostCSSPlugins: [
  //   pxtorem({
  //     rootValue: 75,
  //     propWhiteList: [],
  //   }),
  // ],
  extraBabelPlugins: [
    ['import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }]
  ],
  env: {
    development: {
      extraBabelPlugins: [
        'dva-hmr'
      ]
    }
  },
  proxy: {
    "/api": {
      "target": "http://localhost:3030/",
      "changeOrigin": true,
    }
  },
};
