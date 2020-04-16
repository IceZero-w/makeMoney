import axios from "axios";
import util from "@/libs/util.js";
import { Message } from "element-ui";
const { httpErrorCodes } = util; // 接口错误枚举
const SESSION_ID = "aifocus-cookie";

console.log(process.env, process.env.domain, "------process");
const baseUrl = process.env.NODE_ENV === "production" ? process.env.domain : "";

const http = axios.create({
  baseUrl,
  transformResponse: [
    data => {
      try {
        // 转换成JSON格式
        var enc = new TextDecoder("utf-8");
        var res = JSON.parse(enc.decode(new Uint8Array(data))); //转化成json对象
        return res;
      } catch (err) {
        // 如果转换不成JSON格式，则应该是数据流格式，直接返回data数据
        return data;
      }
    }
  ],
  responseType: "arraybuffer", // 表明返回服务器返回的数据类型，兼容数据流+json格式
  withCredentials: true
});

// 返回头拦截
http.interceptors.response.use(
  res => {
    // 如果返回的是数据流，则使用以下格式打开
    if (
      res.headers["content-type"].includes("multipart/form-data") ||
      res.headers["content-type"].includes("application/octet-stream")
    ) {
      try {
        let disposition = res.headers["content-disposition"];
        let fileName = decodeURIComponent(
          disposition.substring(
            disposition.indexOf("filename=") + 9,
            disposition.length
          )
        );
        // 后端使用的编码是ISO8859-1，乱码后要进行转码，转成中文名
        let blob = new Blob([res.data]);
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.style = "display: visible;";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.log(err, "err");
      }

      return res;
    }
    const { headers } = res;
    const cookie = headers[SESSION_ID];
    if (cookie) {
      localStorage.setItem(SESSION_ID, cookie);
    }
    return res;
  },
  err => {
    // axios内部有做错误处理，虽然报错，但是我们前端需要拼接成接口正常请求的数据结构
    const code = err && err.response ? err.response.status : 0;
    const data = {
      entry: null,
      status: false,
      message: httpErrorCodes[code]
    };
    return Promise.resolve({
      data
    });
  }
);

const Request = (method, url, data) => {
  if (!method) {
    return Message.error({ message: "接口请求方式不正确" });
  }
  if (url.indexOf("/") !== 0 && url.indexOf("http") !== 0) {
    url = `/${url}`;
  }
  let params = {};
  if (method.toUpperCase() === "GET") {
    params = {
      params: data
    };
  } else if (method.toUpperCase() === "POST") {
    params = data;
  }
  return http[method](url, params).then(response => {
    console.log(response, "-----response");
    // 判断response 是否为文件流
    if (
      response.headers &&
      (response.headers["content-type"].includes("multipart/form-data") ||
        response.headers["content-type"].includes("application/octet-stream"))
    ) {
      return Promise.resolve(null);
    } else {
      if (!response.data.status) {
        Message.error({
          message: response.data.message
        });
      }
      return Promise.resolve(response.data);
    }
  });
};

export { Request };
