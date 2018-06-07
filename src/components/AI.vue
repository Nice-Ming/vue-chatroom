<template>
	<transition name="slideToRight">
		<div class="container">
			<header class="chat-header">
				<i class="iconfont icon-xiaoxi" @click="$router.push({path: '/Chat'})"></i>
				<h3>AI助手</h3>
				<i class="iconfont icon-logout" @click="$router.push('/')"></i>
			</header>
			<div class="chat-content" ref="chatContent">
				<ul class="message-list">
					<li class="clearfix"
					    v-for="msg of messages"
					    :class="{'others': msg.from === 'ai', 'mine': msg.from !== 'ai'}"
          >
  					<p class="date">{{ msg.date }}</p>
  					<p class="info">
  						<span class="portrait">
  							<img :src="msg.portrait">
  						</span>
  						<span class="nickname">{{ msg.nickname }}</span>
  					</p>
  					<p class="content" v-html="msg.content"></p>
  				</li>
  			</ul>
  		</div>
  		<footer class="chat-footer">
  			<i></i>
  			<input v-model="inputText" @keyup.enter="sendMsg" autofocus>
        <i class="sendBtn btn iconfont icon-icon_send_fill"
           :class="{'clickable': clickable}"
           @click="sendMsg"
        ></i>
      </footer>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      messages: [],
      inputText: '',
      nickname: '',
      portrait: '',
      location: ''
    }
  },

  beforeRouterEnter(to, from, next) {
    if (!localStorage.nickname) {
      next('/')
    } else {
      next()
    }
  },

  created() {
    this.nickname = this.$store.state.nickname
    this.portrait = this.$store.state.portrait
    this.location = this.$store.state.location

    if (localStorage.record_ai) {
      this.messages = JSON.parse(localStorage.record_ai)
      return
    }

    setTimeout(() => {
      this.messages.push({
        from: 'ai',
        date: this.getTime(),
        nickname: '智能助手',
        portrait: 'static/portrait/robot.svg',
        content: '有什么可以帮您的吗？'
      })
    }, 1000)
  },

  activated() {
    this.$nextTick(() => {
      this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight
    })
  },

  methods: {
    sendMsg() {
      if (!this.inputText) {
        return
      }

      // 智能机器人应答的接口
      let url = 'http://www.niceming.cn/api/chat/AI'
      let data = {
        city: this.location,
        userId: this.nickname,
        inputText: this.inputText
      }

      this.pushMine()
      this.axios.get(url, { params: data }).then(res => {
        this.pushAI(res.data.results)
      })
      this.inputText = ''
    },

    pushMine() {
      this.messages.push({
        from: 'mine',
        date: this.getTime(),
        nickname: this.nickname,
        portrait: this.portrait,
        content: this.inputText
      })
    },

    pushAI(results) {
      let message = {
        from: 'ai',
        date: this.getTime(),
        nickname: '智能助手',
        portrait: 'static/portrait/robot.svg'
      }

      if (!results.length) {
        message.content = '这个问题可难倒我了'
        this.messages.push(message)
        return
      }

      results.forEach(item => {
        if (item.resultType === 'text') {
          message.content = item.values.text
        } else if (item.resultType === 'image') {
          message.content = `<img width="250" src="${item.values.image}">`
        }
        this.messages.push(message)
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
        localStorage.record_ai = JSON.stringify(this.messages)
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
