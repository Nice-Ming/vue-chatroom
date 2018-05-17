<template>
	<transition name="slideToBottom">
		<div class="container">
			<header class="login-header clearfix">
				<i class="iconfont icon-iconfontinfo" @click="isShowAbout = !isShowAbout"></i>
			</header>
			<div class="content">
				<p class="logo">
					<img src="../assets/chatlogo.png" alt="logo">
				</p>
				<p class="input">
					<input v-model="nickname"
								 @keyup.enter="enterChat"
								 placeholder="请输入您的昵称"
								 autofocus
					>
				</p>
				<p class="submitBtn" :class="{'clickable': clickable}" @click="enterChat">进入群聊</p>
			</div>
			<footer class="login-footer">
				<a href="https://github.com/Nice-Ming">&copy; 2018 - NiceMing</a>
			</footer>
			<transition name="showAbout">
				<about v-show="isShowAbout" @closeAbout="isShowAbout = false"></about>
			</transition>
		</div>
	</transition>
</template>

<script>
import About from './About.vue'

export default {
  name: 'Login',
  components: {
    About
  },

  data() {
    return {
      nickname: '',
      isShowAbout: false
    }
  },

  methods: {
    enterChat() {
      if (!this.nickname) {
        return
      }
      localStorage.nickname = this.nickname
      this.$store.commit('setNickname', this.nickname)
      this.$router.push('/Chat')
    }
  },

  computed: {
    clickable() {
      return this.nickname.length > 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/public.scss';
@import '../style/_Login.scss';
</style>
