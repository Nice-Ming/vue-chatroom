/*
* @Author: NiceMing
* @Date:   2018-04-04 16:50:34
*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '',
    location: '',
    nickname: localStorage.nickname,
    portrait: `static/portrait/portrait${Math.ceil(Math.random() * 10)}.svg`
  },

  mutations: {
    setNickname(state, name) {
      state.nickname = name
    },

    setLocation(state, location) {
      state.location = location
    }
  }
})
