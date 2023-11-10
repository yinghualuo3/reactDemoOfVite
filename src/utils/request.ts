/**
 * 配置request请求时的默认参数
 */
// const request = extend({
//     errorHandler, // 默认错误处理
//     credentials: 'include', // 默认请求是否带上cookie
//     // prefix: '/ssp',
//   });
  
//   request.interceptors.request.use((url, options) => {
//     // console.log(options, '--options--');
  
//     const authorization = localStorage.getItem('authorization');
//     return {
//       options: {
//         ...options,
//         interceptors: true,
//         headers: {
//           Authorization: 'Bearer ' + authorization,
//           // ...options?.headers,
//         },
//       },
//     };
//   });