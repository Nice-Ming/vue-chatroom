import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Chat from '@/components/Chat'
import AI from '@/components/AI'

Vue.use(Router)

export default new Router({
	routes: [
	{
		path: '/',
		name: 'Login',
		component: Login
	},
	{
		path: '/Chat',
		name: 'Chat',
		component: Chat
	},
	{
		path: '/AI',
		name: 'AI',
		component: AI
	}
	]
})
