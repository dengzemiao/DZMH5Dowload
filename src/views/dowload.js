// 参考文章 https://blog.csdn.net/zz00008888/article/details/113847294

/**
 * @description: 下载文件
 * @param {*} url 参考 DOWLOAD_FILE_PRO()
 * @param {*} proxy 参考 DOWLOAD_FILE_PRO()
 * @param {*} proxyhttp 参考 DOWLOAD_FILE_PRO()
 */
function DOWLOAD_FILE (url, proxy, proxyhttp) {
  DOWLOAD_FILE_PRO(url, '', proxy, proxyhttp)
}

/**
 * @description: 下载文件
 * @param {*} url 下载链接。（例如：全链接(http://dowload.file/dzm.png) || 除去代理后剩余的部分链接(/dzm.png))
 * @param {*} filename 下载文件名称，为空则取链接尾部文件名。（例如：dzm.png）
 * @param {*} proxy 配置好的代理协议。(例如：/dowload， /dowload == http://dowload.file)
 * @param {*} proxyhttp 代理协议的链接地址，如果配置则会替换 url 中该段代理链接地址为 proxy 代理协议，所以 proxyhttp 有值，proxy 必须有值。(例如：http://dowload.file)
 */
function DOWLOAD_FILE_PRO (url, filename, proxy, proxyhttp) {
  // 下载地址
  var dowloadURL = url
  // 有代理链接地址，当前链接里面同时存在代理地址可以进行替换
  if (proxyhttp && proxy && dowloadURL.includes(proxyhttp)) {
    // 替换代理链接地址为代理协议
    dowloadURL = dowloadURL.replace(proxyhttp, proxy)
    // 代理链接下载
    DOWLOAD_FILE_URL(dowloadURL, filename)
  } else if (proxy) {
    // 将下载链接匹配上代理协议
    dowloadURL = proxy + dowloadURL
    // 代理链接下载
    DOWLOAD_FILE_URL(dowloadURL, filename)
  } else {
    // 链接下载
    DOWLOAD_FILE_URL_PRO(dowloadURL, filename)
  }
}

/**
 * @description: 下载指定代理链接 || 当前网页同域名的链接 || .pdf、.xlsx 等非图片视频链接
 * @param {*} url 代理链接 || 链接
 * @param {*} filename 文件名称
 */
function DOWLOAD_FILE_URL (url, filename) {
  // 创建一个a节点插入的document
  var a = document.createElement('a')
  // 模拟鼠标click点击事件
  var event = new MouseEvent('click')
  // 设置a节点的download属性值
  a.download = DOWLOAD_FILE_NAME(url, filename)
  // 将需要下载的URL赋值给a节点的href
  a.href = url
  // 触发鼠标点击事件
  a.dispatchEvent(event)
}

/**
 * @description: 下载指定链接，但是服务器得开启文件访问权限，否则会报跨域错误
 * @param {*} url 非代理的正常链接
 * @param {*} filename 文件名称
 */
function DOWLOAD_FILE_URL_PRO (url, filename) {
  // 获取链接二进制数据
  fetch(url).then(res => res.blob().then(blob => {
    // 创建一个a节点
    var a = document.createElement('a')
    // 创建一个可供下载链接
    var url = window.URL.createObjectURL(blob)
    // 将需要下载的URL赋值给a节点的href
    a.href = url
    // 设置节点的download属性值
    a.download = DOWLOAD_FILE_NAME(url, filename)
    // 触发点击事件
    a.click()
    // 释放
    window.URL.revokeObjectURL(url)
  }))
}

/**
 * @description: 获取链接文件名
 * @param {*} url 链接
 * @param {*} filename 文件名称
 */
function DOWLOAD_FILE_NAME (url, filename) {
  // 文件名称
  var fname = filename
  // 没有文件名同时链接有值
  if (!fname && url) {
    // 获得最后一个斜杠坐标
    const index = url.lastIndexOf('/')
    // 从斜杆后一个坐标开始截取
    fname = url.substring(index + 1)
  }
  // 返回
  return fname
}

// 导出
module.exports = {
  DOWLOAD_FILE,
  DOWLOAD_FILE_PRO,
  DOWLOAD_FILE_URL,
  DOWLOAD_FILE_URL_PRO,
  DOWLOAD_FILE_NAME
}