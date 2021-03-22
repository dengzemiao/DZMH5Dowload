// 下载文件
export function DOWLOAD_FILE (url, proxy, proxyhttp) {
  DOWLOAD_FILE_PRO(url, '', proxy, proxyhttp)
}

// 下载文件
// url: 下载链接。（例如：全链接(http://dowload.file/dzm.png) || 除去代理后剩余的部分链接(/dzm.png))
// filename: 下载文件名称，为空则取链接尾部文件名。（例如：dzm.png）
// proxy: 配置好的代理协议。(例如：/dowload， /dowload == http://dowload.file)
// proxyhttp: 代理协议的链接地址，如果配置则会替换 url 中该段代理链接地址为 proxy 代理协议，所以 proxyhttp 有值，proxy 必须有值。(例如：http://dowload.file)
export function DOWLOAD_FILE_PRO (url, filename, proxy, proxyhttp) {
  // 文件名称
  var filename = filename
  if (!filename) {
    // 获得最后一个斜杠坐标
    const index = url.lastIndexOf('/')
    // 从斜杆后一个坐标开始截取
    filename = url.substring(index + 1)
  }
  // 下载地址
  var dowloadURL = url
  // 有代理链接地址
  if (proxyhttp && proxy) {
    // 替换代理链接地址为代理协议
    dowloadURL.replace(proxyhttp, proxy)
  } else if (proxy) {
    // 将下载链接匹配上代理协议
    dowloadURL = proxy + dowloadURL
  }
  // 创建一个a节点插入的document
  var a = document.createElement('a')
  // 模拟鼠标click点击事件
  var event = new MouseEvent('click')
  // 设置a节点的download属性值
  a.download = filename
  // 将需要下载的URL赋值给a节点的href
  a.href = dowloadURL
  // 触发鼠标点击事件
  a.dispatchEvent(event)
}
