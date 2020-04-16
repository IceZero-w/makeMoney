import { Request } from "./index.js";

export const demoApi = data => {
  return Request(
    "get",
    // 'http://307m931w46.wicp.vip:31854/api/Users/GetPlatUserInfo?PlatformId=1&pageIndex=1&pageSize=10&key=',
    "/api/Users/GetPlatUserInfo?PlatformId=1&pageIndex=1&pageSize=10&key=",
    data
  );
};
