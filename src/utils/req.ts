import axios from 'axios';
import { message } from 'antd';

const instance = axios.create({
    baseURL: BASE_API_URL,
    timeout: 60000
});

instance.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  instance.interceptors.response.use(function (response) {
    if(response.data.msg) {
      message.success(response.data.msg)
    }
    return response.data.data as any;
  }, function (error) {
    if(error && error.response) {
        switch(error.response.status) {
            case 401:
                // 客户端环境
                if(window) {
                  location.href = '/user/login';
                }
                break;
            case 500:
            case 503:
              message.error(error.response.data.msg)
              break;
            case 501:
             // 没有权限
             window && (location.href = '/user/forbin'); 
             break;
        }
    }
    return Promise.reject(error);
  });

  export default instance
