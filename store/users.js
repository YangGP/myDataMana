import axios from "axios"
export const  USER_GET_TABLE = "USER_GET_TABLE";
export const  USERS_ADD = "USERS_ADD";//增加
export const  USERS_DEC = "USERS_DEC";//删除
export const  USERS_SEARCH = "USERS_SEARCH";//查询
export const  GET_UPDATE = "GET_UPDATE";//修改
export const  USERS_UPDATE = "USERS_UPDATE";//修改
export const  USERSTABLR = "USERSTABLR";

const IPCONFIG = 'http://127.0.0.1:3000'

export default {
	state(){
		return {
			userList: [],	
			total: 0,    //总的页数
			page: 1,		//当前页数
			rows: 10		//行数
		}
	},
	mutations:{
		//填充数据
		[USERSTABLR](state,obj){
			state.userList = obj.list;
			state.total = obj.total;
		}
	},
	actions:{
		//填充页数
		async [USER_GET_TABLE]({commit},obj){
			axios.get(IPCONFIG+'/users/find', {
				params:{
					page:obj.page,
					rows:obj.rows
				}
			}).then(function (response) {
			    commit({
				   type:USERSTABLR,
				   list:response.data.rows,
				   total:response.data.total
			    })
			}.bind(this))
		},
		// 增加
		async [USERS_ADD]({commit},obj){	
			var msg = await axios.get(IPCONFIG+'/users/add',{
				params:{
					phone: obj.phone,
					pwd: obj.pwd,
                    email:obj.email,
                    acc:obj.acc,
                    vipcard:obj.vipcard
				}
			})
		},
		// 删除
		async [USERS_DEC]({commit},obj){
			var msg = await axios.get(IPCONFIG+'/users/del',{
				params:{
					ids: JSON.stringify(obj.ids)
				}
			})
		},
		// 修改确认
		async [USERS_UPDATE]({commit},obj){
			var msg = await axios.get(IPCONFIG+'/users/update',{
				params:{
					_id: obj.id,
                    acc:obj.acc,
					phone: obj.phone,
					psw: obj.psw,
                    email:obj.email,
                    vipcard:obj.vipcard
				}
			})
		},
        // 查找
		async [USERS_SEARCH]({commit},obj){
			var msg = await axios.get(IPCONFIG+'/users/find',{
				params:{
						page: obj.queryParams.page,
						rows: obj.queryParams.rows,
                        acc:
                        obj.queryParams.acc,
						phone: obj.queryParams.phone,
                        email:
                        obj.queryParams.email
                        
				}
			})
			commit({
				type:'USERSTABLR',
				list: msg.data.rows,
				total: msg.data.total
			})
		}
	}
}