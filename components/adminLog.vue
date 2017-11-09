<template>
	<div class="body">
		<el-form class="logBox" label-width="55px">
			<el-tooltip content="输入管理员账号" placement="right">
				<el-form-item label="账号">
					<el-input v-model="name"></el-input>
				</el-form-item>
			</el-tooltip>
			<el-tooltip content="请输入密码" placement="right">
				<el-form-item label="密码">
					<el-input type="password" v-model="psw"></el-input>
				</el-form-item>
			</el-tooltip>
			<el-form-item>
				<el-button @click="login">登陆</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>


<script>
	import axios from 'axios'
	const IPCONFIG = 'http://127.0.0.1:3000'
	
	export default {
		data(){
			return {
				name: '',
				psw: '',
				isLog: false
			}
		},
		methods: {
			async login(){
				
				let data = await axios.post(IPCONFIG + '/adminLog', {
						admin: this.name,
						adminPsw: this.psw
					}
				)
				
				if(data.data == 'suc'){
					sessionStorage.admin = this.name;
					this.$router.push('/main');
				}else{
					this.$message.error('管理员账号/密码错误！');
				}
			}
		}
	}
</script>


<style scoped>
	.logBox {
		width: 300px;
		height: 160px;
		border: 1px solid black;
		position: absolute;
		top: 130px;
		right: 20%;
		background-color: rgba(255,255,255,.8);
		padding: 20px 20px 0 0;
	}
	.body{
		width: 100%;
		height: 100%;
		background: url('../img/bb.jpg') no-repeat;
		background-size: cover;
	}
</style>