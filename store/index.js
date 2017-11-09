import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);


import ConnectMovie from './connectMovie'
import Movie from './Movie'
import Upcoming from './upcoming'
import cinema from './cinema'
import Onshow from './onshow'
import Users from './users'

export default new Vuex.Store({
	modules: {
		ConnectMovie,
		Movie,
		Upcoming,
		cinemas: cinema,
		Users,
		Onshow
	}
})