<!--
 * @Author: your name
 * @Date: 2021-04-09 19:17:39
 * @LastEditTime: 2021-04-12 15:17:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DZMH5Dowload/src/views/Home.vue
-->
<template>
  <div>
    <div class="dowload-btn" @click="touchProxyDowload1">按钮-链接下载</div>
    <div class="dowload-btn" @click="touchProxyDowload2">按钮-代理下载</div>
    <div class="dowload-btn" @click="touchProxyDowload3">按钮-代理下载-自定义文件名</div>
    <div class="dowload-btn">
      <a href="https://file.hepai.video/local/other/6c5d7e97341b2d2806917ee797034835.png" download>a标签-链接下载（跟网页非同域名的只能打开，无法下载，开启访问权限也不行，只能走代理或文件存放自己服务器走同域名下载）</a>
    </div>
    <div class="dowload-btn">
      <a href="/dowload2/files/pic/pic9/202103/hpic3704.jpg" download>a标签-代理下载</a>
    </div>
    <div class="dowload-btn">
      <a href="/dowload1/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F17%2F174124tp3sa6vvckc25oc8.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618976641&t=ca698f4ed0e96eb2f269ccff644bda03" download="avatar.jpg">a标签-代理下载-自定义文件名</a>
    </div>
  </div>
</template>

<script>
import { DOWLOAD_FILE, DOWLOAD_FILE_PRO } from './dowload'
export default {
  data () {
    return {
      // 下载测试连接，百度随便搜的图片地址，未开启访问权限地址:
      // https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F17%2F174124tp3sa6vvckc25oc8.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618976641&t=ca698f4ed0e96eb2f269ccff644bda03
      // https://scpic.chinaz.net/files/pic/pic9/202103/hpic3704.jpg
      // https://file.hepai.video/local/other/3c746d682c7c821c7a792698625dac45.mp4

      // 开启了访问权限地址
      // https://file.hepai.video/local/other/6c5d7e97341b2d2806917ee797034835.png
    }
  },
  methods: {
    // 按钮-链接下载
    touchProxyDowload1 () {
      // 下载指定全链接
      // 由于服务器配置不一样，有的链接会报跨域错误，如果报跨域错误只能走代理下载，也可以要求服务器修改文件访问权限配置

      // 这是一个与当前网页同域名的链接，用于测试。
      // DOWLOAD_FILE_URL('http://localhost:8082/dzm.png')

      // 例如：服务器打开权限运行访问（七牛地址）下载成功
      DOWLOAD_FILE('https://file.hepai.video/local/other/6c5d7e97341b2d2806917ee797034835.png')
      
      // 例如：服务器没有打开权限运行访问（百度图片）下载失败，跨域错误，那就只能走跨域
      // DOWLOAD_FILE('https://scpic.chinaz.net/files/pic/pic9/202103/hpic3704.jpg')
    },
    // 按钮-代理下载（代理配置存放在 vue.config.js，也可以放在服务器中配置）
    touchProxyDowload2 () {

      // 有后缀的则会使用当前后缀图片名称，也可以像上面那样自定义
      DOWLOAD_FILE('/files/pic/pic9/202103/hpic3704.jpg', '/dowload2')

      // DOWLOAD_FILE('/local/other/3c746d682c7c821c7a792698625dac45.mp4', '/dowload3')
    },
    // 按钮-代理下载-自定义文件名（代理配置存放在 vue.config.js，也可以放在服务器中配置）
    touchProxyDowload3 () {
      // 这种没有后缀的图片需要自己传入图片名称带后缀.png .jpg ...
      DOWLOAD_FILE_PRO('/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F17%2F174124tp3sa6vvckc25oc8.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618976641&t=ca698f4ed0e96eb2f269ccff644bda03', 'avatar.png', '/dowload1')
    }
  }
}
</script>

<style scoped>
.dowload-btn {
  margin-top: 20px;
  padding: 5px;
  border: 1px solid gray;
  cursor: pointer;
}
</style>