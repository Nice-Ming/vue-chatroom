<template>
	<transition name="slideToLeft">
		<div class="container">
			<header class="chat-header">
				<i class="iconfont icon-zhinenghuagongcheng" @click="$router.push({path: '/AI'})"></i>
				<span>群聊</span>
				<i class="iconfont icon-logout" @click="$router.push('/')"></i>
			</header>
			<div class="chat-content" ref="chatContent">
				<ul class="message-list">
					<li class="clearfix"
              v-for="msg of messages"
              :class="{'others': msg.from !== 'mine', 'mine': msg.from === 'mine'}"
            >
            <p class="date">{{ msg.date }}</p>
            <p class="info">
               <span class="portrait">
                <img :src="msg.portrait">
              </span>
              <span class="nickname">{{ msg.nickname }}</span>
              <span class="location" v-if="msg.location">{{ `[${msg.location}]` }}</span>
            </p>
            <p class="content">{{ msg.content }}</p>
          </li>
        </ul>
      </div>
      <footer class="chat-footer">
        <i class="iconfont icon-smile emojiBtn"
           :class="{'clickable': isShowEmoji}"
           @click="isShowEmoji = !isShowEmoji"
        ></i>
        <input ref="inputBox"
               v-model="inputText"
               @keyup.enter="sendMsg"
               @focus="hideEmoji"
               placeholder="左上角还有智能机器人哦"
               autofocus
        >
        <i class="sendBtn iconfont icon-icon_send_fill"
           :class="{'clickable': clickable}"
           @click="sendMsg"
        ></i>
      </footer>
      <transition name="showEmoji">
        <div class="emoji-wrap" v-show="isShowEmoji">
          <ul class="emoji-list">
            <li v-for="item of emoji" @click="inputEmoji(item)">{{ item }}</li>
          </ul>
        </div>
      </transition>
      <transition name="showTip">
       <div class="top-tip" v-show="isShowTip">
         <span class="tip-text">{{ onlineTip }}</span>
       </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import io from 'socket.io-client'

// 建立socket.io通信
const socket = io.connect('http://localhost:8081')

export default {
  name: 'Chat',
  data() {
    return {
      messages: [],
      inputText: '',
      nickname: '',
      portrait: '',
      location: '',
      isShowEmoji: false,
      onlineTip: '',
      isShowTip: false,
      emoji: ['😃','😁','😂','😧','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','😙','😚','🙂','🤗','😭','🤔','😳','😐','😑','😶','🙄','😏','😣','😥','😮','🤐','😯','😪','😫','😴','😌','😛','😟','😝','😒','😓','😔','😕','🙃','🤑','😲','🙁','😖','😞','😟','😤','😢','😦'
      ]
    }
  },

  beforeRouterEnter(to, from, next) {
    if (!localStorage.nickname) {
      next('/')
    } else {
      next()
    }
  },

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
  },

  created() {
    this.nickname = this.$store.state.nickname
    this.portrait = this.$store.state.portrait
    this.location = this.$store.state.location

    if (localStorage.record_chat) {
      this.messages = JSON.parse(localStorage.record_chat)
    }
  },

  activated() {
    this.$nextTick(() => {
      this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight
    })
  },

  methods: {
    showTip() {
      this.isShowTip = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.isShowTip = false
      }, 1500)
    },

    hideEmoji() {
      this.isShowEmoji = false
    },

    inputEmoji(emoji) {
      this.inputText += emoji
    },

    sendMsg() {
      if (!this.inputText) {
        return
      }

      socket.emit('sendMsg', {
        from: 'other',
        date: this.getTime(),
        nickname: this.nickname,
        portrait: this.portrait,
        location: this.location,
        content: this.inputText
      })

      this.pushMine()
      this.inputText = ''
      this.isShowEmoji = false
      this.$refs.inputBox.blur()
    },

    pushMine() {
      this.messages.push({
        from: 'mine',
        date: this.getTime(),
        nickname: this.nickname,
        portrait: this.portrait,
        location: this.location,
        content: this.inputText
      })
    },

    getTime() {
      return this.moment().format('YYYY-MM-DD HH:mm:ss')
    },

    fixedBottom() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight
      }, 20)
    }
  },

  computed: {
    clickable() {
      return this.inputText.length > 0
    }
  },

  watch: {
    messages: {
      handler() {
        localStorage.record_chat = JSON.stringify(this.messages)
        this.fixedBottom()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/public.scss';
@import '../style/_Chat.scss';
</style>
