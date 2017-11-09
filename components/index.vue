<template>
	<div class="container">
		<el-row class="main">
			<el-row class="left">
				<el-col class="nav" :span="4">
					<el-row class="nav-top" :class="curColor" >
						<img id="logo" src="../img/LOGO.png" alt="LOGO">
					</el-row>
					<el-row>
						<el-menu default-active="1" class="menu el-menu-vartical"
						 @select="menuClick">
							<el-menu-item v-for="(val, i) in navMenu" :index="val">
								<i :class="icon[i]"></i><p class="option">{{ val }}</p>
							</el-menu-item>
						</el-menu>
					</el-row>
				</el-col>
				<el-col :span="20"><div id="mainContent">
					<el-row>
						<el-col class="rela" :span="24"><div class="header">
							<el-carousel ref="carousel" indicator-position="none" :autoplay="false" arrow="never">
								<el-carousel-item :class="topColor[i]" v-for="(item, i) in textMenu" :key="item">
									<h2>{{ item }}</h2>
								</el-carousel-item>
							</el-carousel></div>
							<div class="adminBox">
								<p>{{ admin }}</p>
								<a class="logout" href="#" @click="logOut">登出</a>
							</div>
						</el-col>
					</el-row>
					<el-row class="contentBox">
						<el-tabs v-model="tabValue.curTab" type="card"
						 @tab-remove="removeTab" @tab-click="tabClick">
							<el-tab-pane :closable="i != 0" v-for="(item, i) in tabValue.tabs" 
								:key="item.name" :label="item.title" :name="item.name"
							></el-tab-pane>
						</el-tabs>
						<router-view/>
					</el-row>
				</div></el-col>
			</el-row>
		</el-row>
	</div>
</template>


<script>
	export default {
		beforeCreate(){
			if(!sessionStorage.admin){
				this.$alert('请先登陆！', '警告', {
					confirmButtonText: '确定',
					callback: () => {
						this.$router.push('/');
					}
				});
			}else{
				this.admin = sessionStorage.admin;
			}
		},
		data(){
			return {
				navMenu: [
					'用户管理',
					'电影管理',
					'院线管理',
					'电影院线匹配管理',
					'热映电影管理',
					'待映电影管理'
				],
				textMenu: [
					'猫眼后台管理系统',
					'用户管理',
					'电影管理',
					'院线管理',
					'电影院线匹配管理',
					'热映电影管理',
					'待映电影管理'
				],
				tabValue: {
					curTab: '1',
					tabs: [{
						title: '欢迎',
						name: '1',
						content: '1'
					}],
					tabIndex: 1
				},
				icon: [
					'fa fa-user fa-lg',
					'fa fa-film fa-lg',
					'fa fa-home fa-lg',
					'fa fa-retweet fa-lg',
					'fa fa-video-camera fa-lg',
					'fa fa-video-camera fa-lg'
				],
				topColor: [
					'white',
					'EFCEE8',
					'F3D7B5',
					'FDFFDF',
					'DAF9CA',
					'pink',
					'skyblue'
				],
				curColor: 'white',
				admin: ''
			}
		},
		methods: {
			menuClick(label){
				this.getSwicth(label);
				for(let one of this.tabValue.tabs){
					if(label == one.title){
						this.tabValue.curTab = one.name;
						return ;
					}
				}
				let newTab = ++this.tabValue.tabIndex + '';
				this.tabValue.tabs.push({
					title: label,
					name: newTab,
					content: 'New Tab'
				});
				this.tabValue.curTab = newTab;
			},
			removeTab(tabName){
				let tabs = this.tabValue.tabs;
				let activeName = this.tabValue.curTab;
				if (activeName == tabName) {
					tabs.forEach((tab, i) => {
						if(tab.name == tabName){
							let nextTab = tabs[i + 1] || tabs[i - 1];
							if(nextTab){
								activeName = nextTab.name;
								this.getSwicth(nextTab.title);
							}
						}
					});
				}
				
				this.tabValue.curTab = activeName;
				this.tabValue.tabs = tabs.filter(tab => tab.name != tabName);
			},
			tabClick(tab, event){
				this.getSwicth(event.target.innerText);
			},
			getSwicth(val){
				switch(val){
					case '欢迎': 
						this.$router.push('/main');
						this.$refs.carousel.setActiveItem(0);
						this.curColor = this.topColor[0];
						break;
					case '用户管理': 
						this.$router.push('/user');
						this.$refs.carousel.setActiveItem(1);
						this.curColor = this.topColor[1];
						break;
					case '电影管理': 
						this.$router.push('/movie');
						this.$refs.carousel.setActiveItem(2);
						this.curColor = this.topColor[2];
						break;
					case '院线管理': 
						this.$router.push('/cinema');
						this.$refs.carousel.setActiveItem(3);
						this.curColor = this.topColor[3];
						break;
					case '电影院线匹配管理': 
						this.$router.push('/connectMovie');
						this.$refs.carousel.setActiveItem(4);
						this.curColor = this.topColor[4];
						break;
					case '热映电影管理': 
						this.$router.push('/onshow');
						this.$refs.carousel.setActiveItem(5);
						this.curColor = this.topColor[5];
						break;
					case '待映电影管理': 
						this.$router.push('/upcoming');
						this.$refs.carousel.setActiveItem(6);
						this.curColor = this.topColor[6];
						break;
				}
			},
			logOut(e){
				e.preventDefault();
				sessionStorage.removeItem('admin');
				this.$router.push('/');
			}
		}
	}
</script>


<style>
	.main,.container,.left,.nav {
		height: 100%;
	}
	.menu {
		height: calc(662px - 50px);
	}
	.mainContent{
		padding: 5px;
	}
	.nav-top {
		height: 50px;
		background-color: #eef1f6;
		text-align: center;
		line-height: 50px;
		transition: all linear .5s;
	}
	#logo {
		vertical-align: middle;
	}
	.logout {
		font-size: 20px;
		padding: 5px;
		transition: all linear .3s;
	}
	.logout:hover {
		background-color: orangered;
		color: white;
	}
	.contentBox {
		padding: 5px 5px 0 10px;
	}
	.header {
		position: relative;
		height: 50px;
		border-bottom: 1px solid #d1dbe5;
		box-shadow: 0 -1px 0px 0px rgba(0,0,0,.13);
	}
	.rela {
		position: relative;
	}
	.adminBox {
		z-index: 10;
		position: absolute;
		top: 30%;
		right: 10%;
	}
	.header h2 {
		font-size: 20px;
		line-height: 50px;
		margin-left: 40px;
	}
	.option {
		display: inline-block;
	}
	.fa {
		width: 22px;
		margin-right: 5px;
		text-align: center;
	}
	.el-carousel {
		height: 100%;
	}
	.el-carousel__container {
		height: 100%;
	}
	.el-carousel__item h3 {
		color: #475669;
		font-size: 18px;
		opacity: 0.75;
		margin: 0;
	}

	.EFCEE8 {
		background-color: #EFCEE8;
	}
	.F3D7B5 {
		background-color: #F3D7B5;
	}
	.FDFFDF {
		background-color: #FDFFDF;
	}
	.DAF9CA {
		background-color: #DAF9CA;
	}
	.pink {
		background-color: pink;
	}
	.white {
		background-color: white;
	}
	.skyblue {
		background-color: skyblue;
	}
	
</style>