import axios from 'axios'

/*-----------------------------------同步-------------------------------------*/
export const MUTATION_SET_MOVIE = 'SET_MOVIE'
export const MUTATION_SET_ALL_MOVIE = 'SET_ALL_MOVIE'
export const MUTATION_SET_CINEMA = 'SET_CINEMA'
export const MUTATION_SET_BIND_CINEMAS = 'SET_BIND_CINEMAS'
export const MUTATION_SET_PROJECTION = 'SET_PROJECTION'
export const MUTATION_SET_SCHEULE = 'SET_SCHEULE'

/*-----------------------------------异步-------------------------------------*/
export const ACTION_GET_MOVIE = 'GET_MOVIE'
export const ACTION_GET_ALL_MOVIE = 'GET_ALL_MOVIE'
export const ACTION_GET_CINEMA = 'GET_CINEMA'
export const ACTION_DEL_MVOIE = 'DEL_MVOIE'
export const ACTION_ADD_CINEMA = 'ADD_CINEMA'
export const ACTION_ADD_MOVIE = 'ADD_MOVIE'
export const ACTION_GET_BIND_CINEMAS = 'GET_BIND_CINEMAS'
export const ACTION_GET_PROJECTION = 'GET_PROJECTION'
export const ACTION_GET_SCHEULE = 'GET_SCHEULE'
export const ACTION_DEL_SCHEULE = 'DEL_SCHEULE'
export const ACTION_EDIT_SCHEULE = 'EDIT_SCHEULE'
export const ACTION_ADD_SCHEULE = 'ADD_SCHEULE'
export const ACTION_DEL_CINEMA = 'DEL_CINEMA'
export const ACTION_CHECK_LOG = 'CHECK_LOG'

const IPCONFIG = 'http://127.0.0.1:3000'

export default {
	state: {
		movies: [],
		allMovies: [],
		cinemas: [],
		bindedCinema: [],
		bindProjection: [],
		scheule: []
	},
	mutations: {
		[MUTATION_SET_MOVIE] (state, obj) {
			state.movies = obj.movies;
		},
		[MUTATION_SET_CINEMA] (state, obj) {
			state.cinemas = obj.cinemas;
		},
		[MUTATION_SET_ALL_MOVIE] (state, obj) {
			state.allMovies = obj.allMovies;
		},
		[MUTATION_SET_BIND_CINEMAS] (state, obj) {
			state.bindedCinema = obj.bindedCinema;
		},
		[MUTATION_SET_PROJECTION] (state, obj) {
			state.bindProjection = obj.projection;
		},
		[MUTATION_SET_SCHEULE] (state, obj) {
			let seats = obj.data.seats;
			let projName = obj.data.projName;
			let scheule = obj.data.scheule;
			let newscheule = [];
			for(let obj of scheule){
				newscheule.push({
					price: obj.price,
					time: obj.time,
					_id: obj._id,
					seats,
					projName
				})
			}
			
			state.scheule = newscheule;
		},
	},
	actions: {
		async [ACTION_GET_MOVIE] ({ commit }) {
			let msg = await axios.get(IPCONFIG+'/checkedMovie/find',{
				params: {
					submitType: "findJoin",
					ref: JSON.stringify(["Movie"])
				}
			})
			
			console.log(msg.data)
			
			let movies = [];
			
			for(let one of msg.data){
				one.Movie[0].cid = one._id;
				one.Movie[0].bid = one._id;
				movies.push(one.Movie[0]);
			}

			commit({
				type: MUTATION_SET_MOVIE,
				movies
			})
			
		},
		async [ACTION_GET_CINEMA] ({ commit }, obj) {
			let msg = await axios.get(IPCONFIG+'/cinemas/find')

			commit({
				type: MUTATION_SET_CINEMA,
				cinemas: msg.data
			})
			
		},
		async [ACTION_DEL_MVOIE] ({ cmommit }, obj) {
			let msg = await axios.get(IPCONFIG+'/checkedMovie/find', {
				params: {
					movies: obj._id
				}
			})
			
			let data = await axios.get(IPCONFIG+'/checkedMovie/del', {
				params: {
					_id: msg.data[0]._id
				}
			})
		},
		async [ACTION_ADD_CINEMA] ({ commit }, obj) {
			for(let id of obj.ids){
				console.log(id)
				await axios.get(IPCONFIG+'/checkedMovie/update', {
					params: {
						_id: obj.checkedId,
						isPush: true,
						cinemas: id
					}
				})
				
				await axios.get(IPCONFIG+'/cinemas/update', {
					params: {
						_id: id,
						isPush: true,
						Movie: obj.mid
					}
				})
			}

		},
		async [ACTION_GET_ALL_MOVIE] ({ commit }, obj) {
			let msg = await axios.get(IPCONFIG+'/Movie/find', {
				params: {
					page: obj.page,
					rows: obj.rows
				}
			})
			
			commit({
				type: MUTATION_SET_ALL_MOVIE,
				allMovies: msg.data
			})
			
		},
		async [ACTION_ADD_MOVIE] ({ commit }, obj){
			for(let id of obj.ids){
				let ida = JSON.stringify([id]);
				await axios.get(IPCONFIG+'/checkedMovie/add', {
					params: {
						Movie: ida
					}
				})
			}
		},
		async [ACTION_GET_BIND_CINEMAS] ({ commit }, obj){
			let msg = await axios.get(IPCONFIG+'/checkedMovie/find', {
				params: {
					_id: obj.id,
					submitType: "findJoin",
					ref: JSON.stringify(["cinemas"])
				}
			})
			
//			console.log(msg.data)
			
			commit({
				type: MUTATION_SET_BIND_CINEMAS,
				bindedCinema: msg.data.cinemas
			})
		},
		async [ACTION_GET_PROJECTION] ({ commit }, obj) {

			let msg = await axios.get(IPCONFIG+'/cinemas/find', {
				params: {
					_id: obj.id,
					submitType: "findJoin",
					ref: JSON.stringify(["projection"])
				}
			})
			
			commit({
				type: MUTATION_SET_PROJECTION,
				projection: msg.data.projection
			})
		},
		async [ACTION_GET_SCHEULE] ({ commit }, obj) {

			let msg = await axios.get(IPCONFIG+'/projection/find', {
				params: {
					_id: obj.id,
					submitType: "findJoin",
					ref: JSON.stringify(["scheule"])
				}
			})
			
			commit({
				type: MUTATION_SET_SCHEULE,
				data: msg.data
			})
		},
		async [ACTION_DEL_SCHEULE] ({ cmommit }, obj) {
			let data = await axios.get(IPCONFIG+'/scheule/del', {
				params: {
					_id: obj.id
				}
			})
		},
		async [ACTION_EDIT_SCHEULE] ({ cmommit }, obj) {
			
//			console.log(obj)
			let data = await axios.get(IPCONFIG+'/scheule/update', {
				params: {
					_id: obj.id,
					time: obj.form.time,
					price: obj.form.price,
					projName: obj.form.projName,
					seats: obj.form.seats,
				}
			})
		},
		async [ACTION_ADD_SCHEULE] ({ cmommit }, obj) {
			
//			console.log(obj)
			let seat = obj.form.seats.map((ele)=>{
				return ele.map((item)=>{
					if(item == 0){
						return 0;
					}else{
						return 10;
					}
				})
			})
			console.log(seat)
			
			let msg = await axios.get(IPCONFIG+'/scheule/add', {
				params: {
					time: obj.form.time,
					price: obj.form.price,
					projName: obj.form.projName,
					seats: JSON.stringify(seat),
				}
			})
			
			await axios.get(IPCONFIG+'/projection/update', {
				params: {
					_id: obj.pid,
					isPush: true,
					scheule: msg.data.insertedIds[0]
				}
			})
			
			await axios.get(IPCONFIG+'/Movie/update', {
				params: {
					_id: obj.mid,
					isPush: true,
					scheule: msg.data.insertedIds[0]
				}
			})
		},
		async [ACTION_DEL_CINEMA] ({ cmommit }, obj) {
			let data = await axios.get(IPCONFIG+'/checkedMovie/update', {
				params: {
					_id: obj._id,
					isPull: true,
					cinemas: obj.cid
				}
			})
		},
		async [ACTION_CHECK_LOG] ({ cmommit }, obj) {
			let msg = await axios.get(IPCONFIG+'/getSession');
			console.log(msg.data)
		},
	}
}