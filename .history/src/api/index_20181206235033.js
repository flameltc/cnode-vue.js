// 配置API接口地址
var root = 'https://cnodejs.org/api/v1'
// 引用axios
var axios = require('axios')
// 自定义判断元素类型JS
function toType(obj) {
  return ({}).toString.call(obj).match(/\s)
}