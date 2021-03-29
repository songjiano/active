import axios from 'axios'
import { Toast } from 'vant'
import router from '../router'
import Global from './GlobalConfig'

let axiosIns = axios.create({
    baseURL: '',
    withCredentials: true,  //跨域请求时是否需要使用凭证
    // headers: {'X-Requested-With': 'XMLHttpRequest'},
    timeout : 100000,
    method: "get"
});

axiosIns.interceptors.request.use(function (config){
    let Token =sessionStorage.getItem("token");
    if(Token){
        config.headers.Authorization =Token&&Token
    }

    return config;
},function (error) {
    return Promise.reject(error)
});

// respone拦截器
axiosIns.interceptors.response.use(

    response => {
        const res = response.data;
        return response;
    },
    error => {
        const type = sessionStorage.getItem("type");
        if (type === "teacher") {
            router.push({ path: '/' })

        } else {
            router.push({ path: '/#/admin' })
        }
    }
);


let axiosDate = new Date();

export function submitData (options) {
    console.log('options',options)
    return new Promise((resolve, reject) => {
        axiosIns(options)
            .then(response => {
                resolve(response);
            })
            .catch((error) => {
                axiosDate = new Date();
                reject(error)
            })
    });
}

/**
 * 执行 get 请求
 * @param url
 * @param params
 */
 axios.get = (url, params) => {

  let config = {
      url : url,
      params : params
  };

  return submitData(config);
};

/**
 * post请求, form提交
 * @param url
 * @param params
 */
 axios.postForm = (url, params,auth) => {
  let config = {
      url : url,
      method : 'post',
      headers: {
          'Content-Type': Global.http_content_type_form,
          Authorization:auth
      },
      data : params,
      transformRequest: [
          function (data) {
              if(!data) {
                  return data;
              }
              let ret = '';
              for(let lt in data) {
                  if(data[lt])
                      ret += encodeURIComponent(lt) + '=' + encodeURIComponent(data[lt]) + '&';
              }
              return ret;
          }
      ]
  };
  return submitData(config);
};

axios.postFormdata = (url, params,auth) => {
  let config = {
      url : url,
      method : 'post',
      headers: {
          Authorization:auth
      },
      data : params,
      transformRequest: [
          function (data) {
              console.log('12354668799', data)
              if(!data) {
                  return data;
              }
              let ret = '';
              for(let lt in data) {
                  if(data[lt])
                      ret += encodeURIComponent(lt) + '=' + encodeURIComponent(data[lt]) + '&';
              }
              return ret;
          }
      ]
  };
  return submitData(config);
};

/**
* post请求, form提交
* @param url
* @param params
*/
axios.postJson = (url, params) => {
  let config = {
      url : url,
      method : 'post',
      headers: {
          'Content-Type': Global.http_content_type_json
      },
      data : params
  };
  return submitData(config);
};

export default axios
