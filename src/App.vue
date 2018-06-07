<template>
	<div id="app">
    <keep-alive>
		  <router-view/>
    </keep-alive>
	</div>
</template>

<script>
export default {
  name: 'App',

  created() {
    this.getLocation()
  },

  methods: {
    getLocation() {
      // 进行ip定位
      this.axios.get('http://www.niceming.cn/api/ip').then(
        res => {
          let location = res.data.province + res.data.city
          this.$store.commit('setLocation', location)
        },
        err => {
          this.$store.commit('setLocation', '未知')
        }
      )
    }
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #555;
  overflow: hidden;
}
</style>
