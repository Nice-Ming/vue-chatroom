# nice-chat

> 用 Vue.js + socket.io 搭建的一个智能聊天室

这算是入坑 Vue 后的第二个练手项目了，是之前四月份就弄完了，一直没法发出来。今天突然想起来，还是发出来记录一下自己的学习历程。废话不多说，下面看东西。

> 链接

[预览链接][2]

> 项目技术栈

1.  前端：Vue.js+vue-router+vuex+Sass
2.  异步请求：axios+promise
3.  后端：express 代理请求 CORS 解决跨域

> 功能实现

IP 定位 智能机器人问答 群聊

> 群聊功能的服务端

build/webpack.dev.conf.js 里添加

```
// 搭建一个socket.io服务
const app = require('express')
const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(8081)

let oSockets = []
io.sockets.on('connection', socket => {
  console.log('用户链接成功')
  oSockets.push(socket)
  // 群聊
  socket.on('sendMsg', data => {
    socket.broadcast.emit('receiveMsg', data)
  })
  // 上线
  socket.on('online', data => {
    socket.broadcast.emit('online', data)
  })
  // 断开连接
  socket.on('disconnect', () => {
    oSockets.filter(item => item !== socket)
    console.log('用户离线')
  })
})
```

> 群聊功能的客户端

components/Chat.vue 里添加

```
import io from 'socket.io-client'

// 建立socket.io通信
const socket = io.connect('http://localhost:8081')

export default {
......
  mounted() {
    // 监听通信事件
    socket.on('online', name => {
      if (!name) {
        return
      }

      this.onlineTip = `${name}加入群聊`
      this.showTip()
    })

    socket.on('receiveMsg', data => {
      this.messages.push(data)
    })

    // 发送上线事件
    socket.emit('online', this.nickname)
  }
......
}
```

> 智能问答功能

这里就不贴代码了 可以在进入我的[GitHub][3]里项目的 src/components/AI.vue 查看其实我这边也是后端代理请求了[图灵机器人][4]提供的免费接口，还是很不错的，注册一个账户就能使用他们的开放 api 了,不过会有个私有的 key 需要请求的时候作为参数传过去，因为每天限制请求 1k 次

> 其他

1.  vuex 虽说是为了中大型项目而生的，这个小项目使用就有点大材小用了，不过也算了解一下 vuex，这个模式还是很棒的，公共的状态放在一个 store 里统一管理，不用再为各个组件之间传值搞得头大
2.  socket.io 是一个 WebSocket 库，包括了客户端的 js 和服务器端的 nodejs，可以建立与服务器的双向通信，使用 emit()和 on()方法来发送和监听服务，也易于理解
3.  express 是 node 上的一个开发框架，通过封装 node 的二次封装，提供简洁的 api，实现路由和中间件的功能
4.  最近在找实习工作 [我的在线简历][5]

[1]: https://github.com/Nice-Ming/vue-chatroom
[2]: http://www.niceming.cn/nice-chat
[3]: https://github.com/Nice-Ming/vue-chatroom
[4]: http://www.tuling123.com/
[5]: http://www.niceming.cn/resume

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
