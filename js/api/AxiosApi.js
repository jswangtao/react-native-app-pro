import axios from 'axios';
import { DeviceEventEmitter, Platform } from 'react-native';
import { msg } from '@/common';

// let baseApiUrl = 'https://api.guojutech.net/'; // 生产地址
const baseApiUrl = 'https://api-uat.guojutech.net/'; // uat地址
// let baseApiUrl = 'https://api-test.guojutech.net/'; // 预发布地址
// let baseApiUrl = 'http://gateway-dev.cqxmgj.lo:9100/'; // dev地址

export const urlConfig = {
  host: baseApiUrl,
};

export const auth = `${urlConfig.host}authority-api`;
let start; // 开始时间

export const showFile = `${auth}/oss/file/`;
axios.defaults.withCredentials = true; // 让ajax携带cookie

// 创建axios实例
const service = axios.create({
  baseURL: urlConfig.host,
  timeout: 100000, // 请求超时时间（毫秒）
  withCredentials: true, // 请求是否携带凭证
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    config.url = urlConfig.host + config.url;
    if (__DEV__) {
      const logHeader = {};
      const logparams = config.method === 'post'
        ? JSON.stringify(config.data)
        : JSON.stringify(config.params);
      Object.assign(logHeader, { method: config.method }, { params: logparams });
      console.warn(
        `wangtao🚚featch|>请求地址：${config.url}`,
        '\n',
        JSON.stringify(logHeader, null, '\t'),
      );
      start = new Date();
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// respone拦截器
service.interceptors.response.use(
  (response) => {
    response.headers['Content-type'] = 'application/json;charset=UTF-8';
    // DeviceEventEmitter.emit('isLoading',false)
    // DeviceEventEmitter.emit('storage',false)
    // NativeModules.WindowModule.dismissLoading()
    if (__DEV__) {
      const time = new Date() - start;
      console.info(
        `wangtao🚚featch|>>${response.config.url} --> 响应时间 : ${time} ms`,
      );
    }
    if (__DEV__) {
      console.log('wangtao🚚featch:返回结果---->', response.data);
    }

    DeviceEventEmitter.emit('isLoading', false);

    return response;
  },
  (error) => {
    if (__DEV__) {
      console.log('wangtao🚚featch|>请求错误', error);
    }
    // 统一返回网络异常给用户，并不一定是网络原因
    msg.emit('app:tip', { text: '网络异常' });

    DeviceEventEmitter.emit('isLoading', false);
    if (!error.response) {
      return Promise.reject(error);
    }
    const res = error.response.data;
    if (res.code === 40101 || res.code === 401) {
      //
    }

    return Promise.reject(error);
  },
);

export function fetchGet(url, params, config) {
  return new Promise((resolve, reject) => {
    service.get(url, { params }, config)
      .then((response) => {
        if (response) {
          resolve(response.data);
        }
      }, (err) => {
        reject(err);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function fetchPost(url, params, config) {
  return new Promise((resolve, reject) => {
    service.post(url, params, config)
      .then(
        (response) => {
          resolve(response.data);
        }, (err) => {
          reject(err);
        },
      )
      .catch((error) => {
        reject(error);
      });
  });
}

export function uploadImage(url, params) {
  return new Promise((resolve, reject) => {
    let formData = new FormData(); // 如果需要上传多张图片,需要遍历数组,把图片的路径数组放入formData中
    if (Platform.OS === 'android') {
      const file = {
        uri: params,
        type: 'multipart/form-data',
        name: 'image.png',
      }; // 这里的key(uri和type和name)不能改变,
      formData.append('file', file);
    } else {
      formData = params;
    }
    fetch(showFile + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data;charset=utf-8',
        'Current-User-Id': userId,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function uploadVoice(url, params, userId) {
  return new Promise((resolve, reject) => {
    const formData = new FormData(); // 如果需要上传多张图片,需要遍历数组,把图片的路径数组放入formData中
    const file = {
      uri: params,
      type: 'multipart/form-data',
      name: 'voice.wav',
      userId,
      createDate: new Date(),
    }; // 这里的key(uri和type和name)不能改变,
    formData.append('file', file);
    fetch(showFile + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data;charset=utf-8',
        'Current-User-Id': userId,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function fetchPostUrl(url, params, config) {
  return new Promise((resolve, reject) => {
    let ret = '';
    for (const it in params) {
      if ({}.hasOwnProperty.call(params, it)) {
        ret += `${encodeURIComponent(it)}=${encodeURIComponent(params[it])}&`;
      }
    }
    ret = ret.slice(0, -1);
    url = `${url}?${ret}`;
    service
      .post(url, params, config)
      .then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
          reject(err);
        },
      )
      .catch((error) => {
        reject(error);
      });
  });
}
export function fetchPostImg(url, params, config) {
  return new Promise((resolve, reject) => {
    service
      .post(url, params, config)
      .then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
          reject(err);
        },
      )
      .catch((error) => {
        reject(error);
      });
  });
}

export function fetchPostFormData(url, params, config) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    for (const i in params) {
      if ({}.hasOwnProperty.call(params, i)) {
        formData.append(i, params[i]);
      }
    }
    service
      .post(url, formData, config)
      .then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
          reject(err);
        },
      )
      .catch((error) => {
        reject(error);
      });
  });
}

// 和以post形式发送数据一样
export function fetchPut(url, params, config) {
  return new Promise((resolve, reject) => {
    service
      .put(url, params, config)
      .then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
          reject(err);
        },
      )
      .catch((error) => {
        reject(error);
      });
  });
}

export function fetchDel(url, params, config) {
  return new Promise((resolve, reject) => {
    service
      .delete(url, params, config)
      .then(
        (response) => {
          if (response) {
            resolve(response.data);
          }
        },
        (err) => {
          reject(err);
        },
      )
      .catch((error) => {
        reject(error);
      });
  });
}
