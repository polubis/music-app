declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.less" {
  const classes: { [key: string]: string };
  export default classes;
}

// declare global {
//   namespace NodeJS {
//     interface ProcessEnv {
//       NODE_ENV: 'development' | 'production' | 'test';
//       PUBLIC_URL: string;
//       REACT_APP_URL: string;
//     }
//   }
// }