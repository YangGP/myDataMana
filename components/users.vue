<template>
	<div>
		<div class="toolbar">
<!--               增加弹框                  -->
            <el-dialog title="增加用户" :visible.sync="user_add">
                <el-form :model="form" lable-width='80px' size='mini'>
                    <el-form-item label="用户名" :label-width="formLabelWidth">
						<el-input v-model="form.acc"></el-input>
					</el-form-item>
                	<el-form-item label="手机" :label-width="formLabelWidth">
						<el-input v-model="form.phone"></el-input>
					</el-form-item>
					<el-form-item label="密码" :label-width="formLabelWidth">
						<el-input v-model="form.pwd"></el-input>
					</el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth">
						<el-input v-model="form.email"></el-input>
					</el-form-item>
                    <el-form-item label="VIP卡" :label-width="formLabelWidth">
						<el-input v-model="form.vipcard"></el-input>
					</el-form-item>
            	</el-form>
            	<div slot="footer" class="dialog-footer">
					<el-button @click="user_add = false">取 消</el-button>
					<el-button type="primary" @click="users_add">确 定</el-button>
            	</div>
            </el-dialog>
            <!-- 修改弹框 -->
			<el-dialog title="修改" :visible.sync="seenBox">
				<el-form :model="updateForm">
                    <el-form-item label="用户名">
						<el-input class="alls" v-model="updateForm.acc"></el-input>
					</el-form-item>
					<el-form-item label="手机">
						<el-input class="alls" v-model="updateForm.phone"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input class="alls" v-model="updateForm.psw"></el-input>
					</el-form-item>
                    <el-form-item label="邮箱">
						<el-input class="alls" v-model="updateForm.email"></el-input>
					</el-form-item>
                    <el-form-item label="VIP卡">
						<el-input class="alls" v-model="updateForm.vipcard"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="seenBox = false">取 消</el-button>
					<el-button type="primary" @click="updateTrue">确 定</el-button>
				</div>
			</el-dialog>
			 
		</div> 
<!--  主页渲染-->
		<div class="myTable">
			<el-button-group>
				<el-button icon="plus" @click="user_add = true">增加用户</el-button>
				<el-button icon="delete"  @click="user_dec">移除用户</el-button>
				<el-button icon="edit" @click="updateTable">修改信息</el-button>
			</el-button-group>
			<el-button-group>
				<!--搜索框-->
              <el-input placeholder="请输入搜索内容" v-model="user_search" style="width:350px;">
                <el-select style="width: 90px" v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="手机号" value="手机号">
                    </el-option>
                    <el-option label="邮箱" value="邮箱">
                    </el-option>
                </el-select>
                <el-button @click="users_search" slot="append" icon="search"></el-button>
              </el-input>
			</el-button-group>
<!--  后台用户列表渲染-->
			<el-table ref="users" border max-height="480" :data="getUserData" @selection-change="SelectionChange" @row-click="clickUserRow">
				<el-table-column type="selection" width="60">
				</el-table-column>
				<el-table-column prop="phone" label="手机号">
				</el-table-column>
				<el-table-column prop="pwd" label="密码">
				</el-table-column>
                <el-table-column prop="vipcard" label="VIP卡">
				</el-table-column>
			</el-table>
		</div>      
		<!-- 翻页 -->
		<div class="block">
		  <el-pagination
			   @current-change="handlePages"
			   @size-change="handleSizeChange"
			   :current-page="curPage"
			   :page-sizes="[5, 10, 20, 40]"
			   :page-size="pageSize"
			   layout="sizes, prev, pager, next, jumper"
			   :total="total">
			 </el-pagination>
		</div>
	</div>
</template>

<script type="text/javascript">
	import {
		USER_GET_TABLE,
        USERS_ADD,
        USERS_DEC,
		USERS_SEARCH,
		USERS_UPDATE,
		GET_UPDATE
    } from "../store/users"
	
	
	
	let users;
	export default {
		beforeCreate(){
			this.$store.dispatch({
				type: USER_GET_TABLE,
				page: 1,
				rows: 10
			})
		},
		created(){
			users = this.$store.state.Users;	
		},
		data(){
			return{
				//翻页的组件
				getUser: [],
				curPage: 1,
		        pageSize: 10,
				total: 1,
                chooseAll: [],
                user_search: '',//搜索
                select: '',//下拉框
                user_add: false,//增加
                seenBox: false,//搜索框
                updateID: '',//修改数据的ID
                //弹框组件
                form: {
                  acc:'',
                  phone: '',
                  psw: '',
                  email:''
                },
                updateForm:{
                    id:'',
                    phone:'',
                    psw:'',
                    acc:'',
                    email:'',
                    vipcard:''
                },
                formLabelWidth:'60px'
            }
		},
		methods:{
			//多选框
			SelectionChange(val) {
				this.chooseAll = val;
			},
			clickUserRow(row){
				this.$refs.users.toggleRowSelection(row);
			},
			//翻页
			handlePages(val){
				this.$store.dispatch({
					type: USER_GET_TABLE,
					page: val,
					rows: this.pageSize
				})
			},
			//每页条数
			handleSizeChange(val){
				//选择的页数
				this.pageSize = val
				this.$store.dispatch({
					type: USER_GET_TABLE,
					page: 1,
					rows: this.pageSize
				})
			},
            cleanInput(){
                this.form.psw = '';
                this.form.phone = '';
            },
            // 新增
            users_add(){
                this.$store.dispatch({
                    type: USERS_ADD,
					phone: this.form.phone,
                    pwd: this.form.pwd,
                    email:this.form.email,
                    acc:this.form.acc
                })
                // 清空输入框
                this.user_add = false;
                this.cleanInput();
            },
            // 删除
            user_dec(){
                let decArr = [];
                for(let items of this.chooseAll){
                    decArr.push(items._id)
                }
                this.$store.dispatch({
                    type: USERS_DEC,
                    ids: decArr
                })
            },
            // 修改弹框
            updateTable(){
				if(this.chooseAll.length != 1){
                    this.cleanInput();
                    this.$message({
                      message: '请单独选择一条内容进行修改！',
                      type: 'success'
                    });
                };
				this.updateID = this.chooseAll[0]._id
				this.seenBox = true;
				this.updateForm.psw = this.chooseAll[0].psw;
				this.updateForm.phone = this.chooseAll[0].phone;
            },	
            // 修改确认
            updateTrue(){
                this.seenBox = false;
				this.$store.dispatch({
					type: USERS_UPDATE,
					id: this.updateID,
					psw: this.updateForm.psw,
					phone: this.updateForm.phone,
				})
				this.$message({
				  message: '修改成功！',
				  type: 'success'
				});
				this.cleanInput();
            },
			// 搜索
			users_search(){
				var obj = {};
				switch(this.select){
					case "用户名":
						obj = {
							acc : this.user_search,
							page: 1,
							rows: this.pageSize
						}
					break;
					case "手机号":
						obj = {
							phone: this.user_search,
							page: 1,
							rows: this.pageSize
						}
					break;
					case "邮箱":
						obj = {
							email: this.user_search,
							page: 1,
							rows: this.pageSize
						}
					break;
				}
				this.$store.dispatch({
					type: USERS_SEARCH,
					queryParams: obj
				})
			}    
		},
		computed: {
			getUserData(){
				this.total = users.total;
				return this.getUser = users.userList;
			}
		}
	}


</script>

<style scope>
	*{
		margin: 0;
		padding: 0;
	}
   
	.block{
		text-align: center;
	}
	.toolbar{
		width: 1200px;
		margin: auto;
		margin-top: 4px;
		margin-bottom: 4px;
		
	}
	.el-button {
	    font-size: 14px;
	}
	.el-button+.el-button {
    margin-left: 0px;
}
</style>
