import axios from "axios";
import { Message } from 'element-ui';
import cookie from './cookie';

// 创建axios实例
const request = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
        ? 'http://39.107.67.145:9000'
        : 'http://localhost:9000',
    timeout: 5000, // 请求超时时间
    // headers: {
    //     'Content-Type': 'application/json;charset=utf-8',
    // }
});

// 创建重试配置
const retryConfig = {
  maxRetries: 3,  // 最大重试次数
  retryDelay: 1000,  // 重试间隔时间（毫秒）
  retryableStatus: [408, 500, 502, 503, 504]  // 可重试的状态码
};

// 创建重试函数
const retryRequest = async (error, instance) => {
  const config = error.config;
  
  config.__retryCount = config.__retryCount || 0;
  
  const canRetry = error.response && 
    retryConfig.retryableStatus.includes(error.response.status) &&
    config.__retryCount < retryConfig.maxRetries;

  if (!canRetry) {
    return Promise.reject(error);
  }

  config.__retryCount += 1;

  const delay = new Promise(resolve => {
    setTimeout(resolve, retryConfig.retryDelay);
  });

  await delay;
  console.log(`正在进行第 ${config.__retryCount} 次重试`);
  return instance(config);
};

// 请求拦截器
request.interceptors.request.use(
    config => {
        
        // 从cookie中获取token
        const token = cookie.getCookie('userName');
        console.log(token);
        
        if (token) {
            // 对token进行编码，确保只包含合法字符
            const encodedToken = encodeURIComponent(token);
            config.headers['Authorization'] = `Bearer ${encodedToken}`;
        }
        return config;
    },
    error => {
        console.error('请求错误：', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
request.interceptors.response.use(
    response => {
        console.log(response);
        const res = response.data;
        
        if (res.status === true) {
            return response;
        } else {
            Message({
                message: res.message || '请求失败',
                type: 'error',
                duration: 3000
            });
            return Promise.reject(new Error(res.message || '请求失败'));
        }
    },
    async error => {
        console.error('响应错误：', error);
        let message = '';

        // 尝试重试请求
        try {
            const result = await retryRequest(error, request);
            return result;
        } catch (retryError) {
            // 重试失败后处理错误信息
            if (retryError.response) {
                switch (retryError.response.status) {
                    case 401:
                        message = '未授权，请重新登录';
                        cookie.clearCookie('token');
                        break;
                    case 403:
                        message = '拒绝访问';
                        break;
                    case 404:
                        message = '请求错误，未找到该资源';
                        break;
                    case 408:
                        message = '请求超时';
                        break;
                    case 500:
                        message = '服务器内部错误';
                        break;
                    case 501:
                        message = '服务未实现';
                        break;
                    case 502:
                        message = '网关错误';
                        break;
                    case 503:
                        message = '服务不可用';
                        break;
                    case 504:
                        message = '网关超时';
                        break;
                    default:
                        message = '系统未知错误';
                }
            } else {
                if (retryError.message.includes('timeout')) {
                    message = '网络请求超时';
                } else {
                    message = '连接服务器失败';
                }
            }

            // 显示最终的错误信息
            Message({
                message: `${message}${retryError.config.__retryCount ? ` (已重试${retryError.config.__retryCount}次)` : ''}`,
                type: 'error',
                duration: 3000
            });
            return Promise.reject(retryError);
        }
    }
);

export default request;