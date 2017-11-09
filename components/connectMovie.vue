<template>
	<div>
		<el-button-group>
			<el-button icon="plus" @click="addNewMovie">添加电影</el-button>
			<el-button icon="edit" @click="bindCinema">添加影院</el-button>
			<el-button icon="setting" @click="cinemaDet">查看关联信息</el-button>
		</el-button-group>
		<el-table border ref="singleTable" :data="getMovieData" highlight-current-row
		@current-change="getCurMovie" style="width: 100%" max-height="480">
			<el-table-column type="index" width="45">
			</el-table-column>
			<el-table-column property="CName" label="电影名" width="120">
			</el-table-column>
			<el-table-column property="actors" label="演员">
			</el-table-column>
			<el-table-column label="操作" width="80">
				<template scope="scope">
					<el-button @click="delMovie(scope.row, scope.$index, getMovieData)" type="danger"
					size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog size="large" title="添加电影" :visible.sync="movieTabVisible">
			<el-table border ref="movieTable" :data="getAllMovieData" @row-click="clickMovieRow"
			@selection-change="movieSelected" style="width: 100%">
				<el-table-column type="selection" width="45">
				</el-table-column>
				<el-table-column type="index" width="50">
				</el-table-column>
				<el-table-column property="CName" label="影院名">
				</el-table-column>
				<el-table-column property="type" label="类型">
				</el-table-column>
				<el-table-column property="area" label="地区">
				</el-table-column>
				<el-table-column property="score" label="评分">
				</el-table-column>
			</el-table>
			<el-pagination style="text-align: center" small layout="prev, pager, next" :total="allMovieNum" 
			@current-change="setAllMovieData">
			</el-pagination>
			<div slot="footer" class="dialog-footer">
				<el-button @click="movieTabVisible = false">取 消</el-button>
				<el-button type="primary" @click="movieAdd">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog size="large" title="绑定影院" :visible.sync="cinemaTabVisible">
			<el-table border ref="cinemaTable" :data="getCinemaData" @row-click="clickCinemaRow"
			@selection-change="cinemaSelected" style="width: 100%">
				<el-table-column type="selection" width="45">
				</el-table-column>
				<el-table-column type="index" width="45">
				</el-table-column>
				<el-table-column property="cinemaName" label="影院名">
				</el-table-column>
				<el-table-column property="address" label="地址">
				</el-table-column>
				<el-table-column property="tel" label="电话">
				</el-table-column>
				<el-table-column property="webAdress" label="网站">
				</el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cinemaTabVisible = false">取 消</el-button>
				<el-button type="primary" @click="cinemaAdd">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog size="large" title="影院信息" :visible.sync="cinemaDetTabVisible">
			<el-button-group>
				<el-button type="primary" icon="edit" @click="showScheule">查看排片</el-button>
				<el-button type="primary" icon="plus" @click="addScheuleForm">添加排片</el-button>
			</el-button-group>
			<el-table border :data="getBindCinemaData" @row-click="clickBindCinemaRow" style="width: 100%" @expand="expandCinema">
				<el-table-column type="expand">
					<el-table :data="getProjection" highlight-current-row @row-click="clickProjectionRow">
						<el-table-column property="projName" label="放映厅">
						</el-table-column>
					</el-table>
				</el-table-column>
				<el-table-column type="index" width="45">
				</el-table-column>
				<el-table-column property="cinemaName" label="影院名">
				</el-table-column>
				<el-table-column property="address" label="地址">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
					<template scope="scope">
						<el-button @click="delCin(scope.row, scope.$index, getBindCinemaData)" type="danger" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-table v-if="scheuleVisible" :data="getScheule" @row-click="clickScheuleRow" highlight-current-row>
				<el-table-column>
					<el-table-column property="projName" label="放映厅">
					</el-table-column>
					<el-table-column property="price" label="价格">
					</el-table-column>
					<el-table-column property="time" label="时间">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="100">
						<template scope="scope">
							<el-button @click="editSch(scope.row)" type="text" size="small">编辑</el-button>
							<el-button @click="delSch(scope.row, scope.$index, getScheule)" type="danger" size="small">删除</el-button>
						</template>
					</el-table-column>
				</el-table-column>
			</el-table>
			<el-form v-if="formVisible" :model="schForm" ref="schForm" label-width="100px">
				<el-form-item label="价格" prop="price">
					<el-input type="text" v-model="schForm.price"></el-input>
				</el-form-item>
				<el-form-item label="时间" prop="time">
					<el-input v-model="schForm.time"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="formVisible = false">取消</el-button>
					<el-button @click="addScheule">提交</el-button>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeDlg">关 闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>


<script>
	import {
		ACTION_GET_MOVIE,
		ACTION_GET_CINEMA,
		ACTION_DEL_MVOIE,
		ACTION_ADD_CINEMA,
		ACTION_GET_ALL_MOVIE,
		ACTION_ADD_MOVIE,
		ACTION_GET_BIND_CINEMAS,
		ACTION_GET_PROJECTION,
		ACTION_GET_SCHEULE,
		ACTION_DEL_SCHEULE,
		ACTION_EDIT_SCHEULE,
		ACTION_ADD_SCHEULE,
		ACTION_DEL_CINEMA,
		ACTION_CHECK_LOG
	} from '../store/connectMovie'
	
	let ConnectMovie;
	
	export default {
		created(){
			ConnectMovie = this.$store.state.ConnectMovie;
		},
		mounted(){
			this.setMovieData();
		},
		data(){
			return {
				checkedRow: '',
				movieRow: '',
				projectionRow: '',
				scheuleRow: '',
				movies: [],
				cinemas: [],
				allMovies: [],
				allMovieNum: 1,
				bindedCinema: [],
				projection: [],
				scheule: [],
				cinemaTabVisible: false,
				movieTabVisible: false,
				cinemaDetTabVisible: false,
				scheuleVisible: false,
				formVisible: false,
				cinemaSelection: [],
				movieSelection: [],
				schForm: {
					price: '',
					time: '',
					projName: '',
					seats: ''
				},
				editFLag: false,
				visible1: false,
				visible2: false
			}
		},
		methods: {
			//获取checkedMovie的id
			getCurMovie(currentRow){
				this.checkedRow = currentRow.cid;
				this.movieRow = currentRow._id;
			},
			//获取checkedmovie电影及影院信息
			setMovieData(){
				this.$store.dispatch(ACTION_GET_MOVIE);
			},
			setCinemaData(){
				this.$store.dispatch(ACTION_GET_CINEMA);
			},
			setBindCinema(){
				this.$store.dispatch({
					type: ACTION_GET_BIND_CINEMAS,
					id: this.checkedRow
				})
			},
			setAllMovieData(i){
				this.$store.dispatch({
					type: ACTION_GET_ALL_MOVIE,
					page: i,
					rows: 10
				});
			},
			//绑定电影与影院的对话框
			bindCinema(){
				if(!this.checkedRow){
					this.$message({
						message: '未选中电影',
						type: 'warning'
					});
					return false;
				}
				this.setCinemaData();
				this.cinemaTabVisible = true;
			},
			//打开电影对话框
			addNewMovie(){
				this.setAllMovieData(1);
				this.movieTabVisible = true;
			},
			cinemaDet(){
				this.setBindCinema();
				this.cinemaDetTabVisible = true;
			},
			//删除checkedmovie里的电影
			delMovie(row, index, data){
				this.$store.dispatch({
					type: ACTION_DEL_MVOIE,
					_id: row._id
				});
				data.splice(index, 1);
			},
			delCin(row, index, data){
				this.$store.dispatch({
					type: ACTION_DEL_CINEMA,
					_id: this.checkedRow,
					cid: row._id
				})
				data.splice(index, 1);
			},
			//被选中的影院
			cinemaSelected(val){
				this.cinemaSelection = val;
			},
			clickCinemaRow(row){
				this.$refs.cinemaTable.toggleRowSelection(row)
			},
			//添加影院
			cinemaAdd(){
				let ids = this.cinemaSelection.map((ele) => {
					return ele._id;
				})
				if(ids.length == 0){
					this.$message.error('请选择至少一座影院');
					return false;
				}
				this.cinemaTabVisible = false;
				this.$store.dispatch({
					type: ACTION_ADD_CINEMA,
					checkedId: this.checkedRow,
					mid: this.movieRow,
					ids
				})
				this.setMovieData();
				this.$message({
					message: '绑定影院成功',
					type: 'success'
				});
				this.cinemaDet();
			},
			//被选中的电影
			movieSelected(val){
				this.movieSelection = val;
			},
			clickMovieRow(row){
				this.$refs.movieTable.toggleRowSelection(row)
			},
			//添加电影
			movieAdd(){
				let ids = this.movieSelection.map((ele) => {
					return ele._id;
				});
				if(ids.length == 0){
					this.$message.error('请选择至少一部电影');
					return false;
				}
				this.$store.dispatch({
					type: ACTION_ADD_MOVIE,
					movieId: this.checkedRow,
					ids
				});
				this.setMovieData();
				this.movieTabVisible = false;
				this.visible1 = false;
				this.$message({
					message: '添加电影成功',
					type: 'success'
				});
			},
			
			//获取电影绑定的电影院
			clickBindCinemaRow(row){
				
			},
			expandCinema(row, expanded){
				if(expanded){
					this.$store.dispatch({
						type: ACTION_GET_PROJECTION,
						id: row._id
					})
				}else{
					this.clearData();
				}
			},
			
			//保存放映厅id
			clickProjectionRow(row){
				this.projectionRow = row._id;
//				console.log(row)
				this.schForm.projName = row.projName;
				this.schForm.seats = row.seats;
			},
			//保存排片id
			clickScheuleRow(row){
				this.scheuleRow = row._id;
			},
			showScheule(){
				if(!this.projectionRow){
					this.$message({
						showClose: true,
						message: '请选择一个放映厅',
						type: 'warning'
        			});
					return false;
				}
				this.$store.dispatch({
					type: ACTION_GET_SCHEULE,
					id: this.projectionRow
				})
				this.scheuleVisible = true;
			},
			//编辑排片
			addScheuleForm(){
				if(!this.projectionRow){
					this.$message({
						showClose: true,
						message: '请选择一个放映厅',
						type: 'warning'
        			});
					return false;
				};
				this.clearData();
				this.formVisible = true;
			},
			//添加排片
			addScheule(){
				if(this.editFLag){
					this.$store.dispatch({
						type: ACTION_EDIT_SCHEULE,
						form: this.schForm,
						id: this.scheuleRow
					});
					this.editFLag = false;
				}else{
					this.$store.dispatch({
						type: ACTION_ADD_SCHEULE,
						form: this.schForm,
						pid: this.projectionRow,
						mid: this.movieRow
					});
				}
				this.clearData();
				this.formVisible = false;
			},
			editSch(row){
				this.editFLag = true;
//				console.log(row)
				this.schForm.price = row.price;
				this.schForm.time = row.time;
				this.schForm.projName = row.projName;
				this.schForm.seats = row.seats;
				this.formVisible = true;
			},
			delSch(row, index, data){
				this.$store.dispatch({
					type: ACTION_DEL_SCHEULE,
					id: row._id
				});
				data.splice(index, 1);
			},
			
			clearData(){
				this.projection = [];
				this.scheule = [];
			},
			closeDlg(){
				this.cinemaDetTabVisible = false;
				this.scheuleVisible = false;
				this.formVisible = false;
			}
		},
		computed: {
			getMovieData(){
				return this.movies = ConnectMovie.movies;
			},
			getAllMovieData(){
				this.allMovieNum = ConnectMovie.allMovies.total
				return this.allMovies = ConnectMovie.allMovies.rows;;
			},
			getCinemaData(){
				return this.cinemas = ConnectMovie.cinemas;
			},
			getBindCinemaData(){
				return this.bindedCinema = ConnectMovie.bindedCinema;
			},
			getProjection(){
				return this.projection = ConnectMovie.bindProjection;
			},
			getScheule(){
				return this.scheule = ConnectMovie.scheule;
			}
			
		}
	}
</script>


<style scoped>


</style>