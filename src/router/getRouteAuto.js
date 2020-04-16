const files = require.context("../views", true, /route.vue$/);
console.dir(files.keys(), "----files");
const routeList = [];
files.keys().forEach(item => {
  let path1 = item.replace(/.\//, "");
  let path2 = path1.replace(/(\/route.vue)/g, "");
  const obj = {
    path: `/${path2}`,
    name: path2,
    component: () =>
      import(/* webpackChunkName: `${String(path2)}` */ `@/views/${path1}`)
  };
  console.dir(`@/views/${path1}`, "----objobj");
  routeList.push(obj);
});
console.dir(routeList, "----routeList");

// files
export default routeList;
