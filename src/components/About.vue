<template>
  <div class="about-wrap">
    <div class="about-header">
      <p>Vue.js+socket.io</p>
      <p>实现的简易智能聊天室</p>
      <i class="iconfont icon-guanbi" @click="$emit('closeAbout')"></i>
    </div>
    <div class="about-content">
      <div class="content">
        <p class="content-title">技术栈</p>
        <ul class="content-list">
          <li v-for="item of techStack">
            <a :href="item.link" target="_blank">{{ item.type }}</a>
            <span>{{ item.use }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      techStack: [
        {
          type: 'Vue.js',
          use: '数据驱动页面构建',
          link: 'https://cn.vuejs.org/'
        },
        {
          type: 'vuex',
          use: '组件之间的状态管理',
          link: 'https://vuex.vuejs.org/zh-cn/'
        },
        {
          type: 'vue-router',
          use: '路由管理和切换',
          link: 'https://router.vuejs.org/zh-cn/'
        },
        {
          type: 'socket.io',
          use: '双向的实时通信',
          link: 'https://socket.io/'
        },
        {
          type: 'axios',
          use: '用于http请求',
          link: 'https://www.kancloud.cn/yunye/axios/234845'
        },
        {
          type: 'moment.js',
          use: '处理时间格式',
          link: 'http://momentjs.cn/'
        },
        {
          type: 'express',
          use: 'node后端',
          link: 'http://www.expressjs.com.cn/'
        },
        {
          type: 'localStorage',
          use: '本地数据存储',
          link: ''
        },
        {
          type: 'ES6 Sass',
          use: '基础语法',
          link: ''
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/public.scss';
@import '../style/About.scss';
</style>
