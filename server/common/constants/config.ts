// import * as path from 'path';

// export class GIOConfig {
//   private constructor() { }

//   // 实际 json 配置
//   private static _config: any =  { };

//   public static init(confPath: string = null) {
//     confPath = confPath || path.resolve(__dirname, '../.gio/config.js');
//     const confModule = require(confPath);
//     let conf = confModule && confModule.__esModule ? confModule.default : confModule;
//     if (typeof conf === 'function') {
//       conf = conf.apply();
//     }
//     this._config = conf;
//   }

//   public static get config() {
//     return this._config;
//   }
// }
