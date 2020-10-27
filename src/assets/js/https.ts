import axios from 'axios';
import qs from 'qs'
import { Toast } from 'vant';
let baseUrl: string = process.env.VUE_APP_URI_DOMAIN
const instance = axios.create({
    baseURL: baseUrl,
    timeout: 10000, // 请求超时时间
    transformResponse: [data => data],
});
//http request 拦截器
instance.interceptors.request.use(
  (config:any) => {
    config.url = baseUrl + config.url
    config.headers = {
      'Content-Type':'application/json',
    }
    return config;
  },
  (error:any) => {
    return Promise.reject(error);
  }
);
//http response 拦截器
instance.interceptors.response.use(
    response => {
        if (response.data == undefined) {
            response = response.request.responseText;
        } else {
            response = response.data;
        }
        // if(response.data.errCode ==2){
        //   router.push({
        //     path:"/login",
        //     query:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
        //   })
        // }
        return response;
      },
      error => {
        if (error && error.response) { // 统一拦截
            switch (error.response.status) {
                case 400:
                    error.msg = "请求错误";
                    break;

                case 401:
                    error.msg = "未登录";
                    break;

                case 403:
                    error.msg = "拒绝访问";
                    break;

                case 404:
                    error.msg = `请求地址出错: ${error.response.config.url}`;
                    break;

                case 408:
                    error.msg = "请求超时";
                    break;

                case 500:
                    error.msg = "服务器内部错误";
                    break;

                case 501:
                    error.msg = "服务未实现";
                    break;

                case 502:
                    error.msg = "网关错误";
                    break;

                case 503:
                    error.msg = "服务不可用";
                    break;

                case 504:
                    error.msg = "网关超时";
                    break;

                case 505:
                    error.msg = "HTTP版本不受支持";
                    break;

                default:
            }
        }
        return Promise.reject(error); // 返回接口返回的错误信息
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url:any,params={}) {
  return new Promise((resolve,reject) => {
    instance.get(url,{
      params:params
    })
    .then((response:any) => {
      resolve(JSON.parse(response));
    })
    .catch((err:any) => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url:any,data = {}) {
   return new Promise((resolve,reject) => {
    instance.post(url,data)
          .then((response:any) => {
            resolve(JSON.parse(response));
          },(err:any) => {
            reject(err)
          })
   })
 }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url:any,data = {}){
  return new Promise((resolve,reject) => {
    instance.patch(url,data)
         .then((response:any) => {
           resolve(response.data);
         },(err:any) => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url:any,data = {}){
  return new Promise((resolve,reject) => {
    instance.put(url,data)
         .then((response:any) => {
           resolve(response.data);
         },(err:any) => {
           reject(err)
         })
  })
}