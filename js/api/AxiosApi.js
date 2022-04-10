import axios from "axios";
import { APP_REQUEST_DOMAIN_PREFIX } from "../config/baseConfig";

let start; // 开始时间

// 请求添加条件，如token
axios.interceptors.request.use(
  config => {
    if (__DEV__) {
      const logHeader = {};
      const logparams = config.method === "post" ? JSON.stringify(config.data) : JSON.stringify(config.params);
      Object.assign(logHeader, { method: config.method }, { params: logparams });
      console.warn(
        `wangtao🚚featch|>请求地址：${config.baseURL + config.url}`,
        "\n",
        JSON.stringify(logHeader, null, "\t")
      );
      start = new Date();
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 接口返回处理
axios.interceptors.response.use(
  response => {
    if (__DEV__) {
      const time = new Date() - start;
      console.info(`wangtao🚚featch|>>${response.config.baseURL + response.config.url} --> 响应时间 : ${time} ms`);
    }
    if (__DEV__) {
      console.log("wangtao🚚featch:返回结果---->", response.data);
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

function handleError(error, reject, opts) {
  if (error.response && error.response.data) {
    // 未登录
    if (
      error.response.data.code === 40000 ||
      error.response.data.code === 40001 ||
      error.response.data.code === 40002 ||
      error.response.data.code === 40003 ||
      error.response.data.code === 40005 ||
      error.response.data.code === 40006 ||
      error.response.data.code === 40008
    ) {
      console.log("🚀🚀🚀wimi======>>>http成功，接口未成功");
      return;
    }
  } else if (error.message) {
    console.log("🚀🚀🚀wimi======>>>http未成功，");
  }
  reject(error);
}

function handleSuccess(res, resolve, opts) {
  resolve(res);
}

// http请求
const httpServer = opts => {
  // 公共参数
  const publicParams = {
    ts: Date.now()
  };

  // http默认配置
  const method = opts.method.toUpperCase();
  const httpDefaultOpts = {
    method,
    baseURL: APP_REQUEST_DOMAIN_PREFIX,
    url: opts.url,
    responseType: opts.responseType || "",
    timeout: 10000
  };
  if (opts["meta"]) {
    httpDefaultOpts.headers = opts["meta"];
  }

  const dataRequest = ["PUT", "POST", "PATCH"];
  if (dataRequest.includes(method)) {
    httpDefaultOpts.data = opts.data || {};
  } else {
    httpDefaultOpts.params = {
      ...publicParams,
      ...(opts.data || {})
    };
  }

  // formData转换
  if (opts.formData) {
    httpDefaultOpts.transformRequest = [
      data => {
        const formData = new FormData();
        if (data) {
          Object.entries(data).forEach(item => {
            formData.append(item[0], item[1]);
          });
        }
        return formData;
      }
    ];
  }

  const promise = new Promise((resolve, reject) => {
    axios(httpDefaultOpts)
      .then(response => {
        handleSuccess(response, resolve, opts);
      })
      .catch(error => {
        handleError(error, reject, opts);
      });
  });
  return promise;
};

export default httpServer;
