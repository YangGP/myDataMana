import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components'
import AdminLog from '@/components/adminLog'
import Hello from '@/components/hello'
import User from '@/components/users'
import Movie from '@/components/movie'
import Cinema from '@/components/cinema'
import ConnectMovie from '@/components/connectMovie'
import OnShow from '@/components/onshow'
import UpComing from '@/components/upcoming'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/main',
        name: 'Hello',
        component: Index,
		children: [{
			path: '/',
			component: Hello
		},{
			path: '/user',
			component: User
		},{
			path: '/movie',
			component: Movie
		},{
			path: '/cinema',
			component: Cinema
		},{
			path: '/connectMovie',
			component: ConnectMovie
		},{
			path: '/upcoming',
			component: UpComing
		},{
			path: '/onshow',
			component: OnShow
		}]
	},
	{
		path: '/',
		name: 'adminLog',
		component: AdminLog
	}
  ]
})