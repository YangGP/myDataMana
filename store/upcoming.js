import axios from 'axios'
// --------------同步-----------------
// 初始化upcoming
export const MUTATION_UP_DATA='MUTATION_UP_DATA'
//初始化里面表格
export const MUTATION_UP_MOVIE='MUTATION_UP_MOVIE'

// ----------------------异步---------------
// 初始化upcoming页面
export const ACTION_UP_DATA='ACTION_UP_DATA'
//删除
export const ACTION_UP_REMOVE='ACTION_UP_REMOVE'
//初始化里面表格
export const ACTION_UP_MOVIE='ACTION_UP_MOVIE'
//添加数据
export const ACTION_UP_ADD='ACTION_UP_ADD'
//搜索名字
export const ACTION_UP_NSEARCH='ACTION_UP_NSEARCH'
//区域搜索
export const ACTION_UP_AREASEARCH='ACTION_UP_AREASEARCH'

const IPCONFIG = 'http://127.0.0.1:3000'

export default{
    state:{
        upData:[],
        eachpage:10,
        curpage:1,
        total:1,
         //里面表格的数据
        innerData:[],
        allTotal:1
    },
    mutations:{
        [MUTATION_UP_DATA](state,obj){
            state.upData=obj.upcoming.rows;
            state.curpage=obj.upcoming.curpage;
            state.total=obj.upcoming.total; 
        },
        [MUTATION_UP_MOVIE](state,obj){
            state.innerData=obj.movies.rows
            state.allTotal=obj.movies.total; 
        }
    },
    //初始化表格
    actions:{
        async[ACTION_UP_DATA]({commit},obj){
        let data=await axios.get(IPCONFIG+'/upcoming/find',{
            params:{
                page:obj.page,
                rows:obj.rows
            }
        })
            // console.log(data)
            commit({
                type:MUTATION_UP_DATA,
                upcoming:data.data
            })
        },
         //删除
        async[ACTION_UP_REMOVE]({commit},obj){
            let data=await axios.get(IPCONFIG+'/upcoming/del',{
                params:{
                    ids:obj._id
                }
            })
            // console.log(obj);
            commit({
                type:MUTATION_UP_DATA,
                upcoming:data.data
            })
        },
        //初始化里面表格
        async[ACTION_UP_MOVIE]({commit},obj){
            let data=await axios.get(IPCONFIG+'/Movie/find',{
                params:{
                    page:obj.page,
                    rows:obj.rows
                }
        })
        // console.log(data.data.total)
            commit({
                type:MUTATION_UP_MOVIE,
                movies:data.data
            })
        },
        //添加数据
        async[ACTION_UP_ADD]({commit,dispatch,state},obj){
			
            for(let i=0;i<obj.idArray.length;i++){
				let mid = obj.idArray[i]._id;
				delete obj.idArray[i]._id;
				
                let msg=await axios.get(IPCONFIG+'/upcoming/add',{
                    params:obj.idArray[i]
                })
				
				let insertid = msg.data.insertedIds[0];
				
				await axios.get(IPCONFIG+'/upcoming/update',{
					params:{
						_id: insertid,
						mid
					}
				})
				
				await axios.get(IPCONFIG+'/Movie/update',{
					params:{
						_id: mid,
						isUpcoming: true
					}
				})
                
            }
            dispatch({
                type:ACTION_UP_DATA,
                page:state.curpage,
                rows:state.eachpage
            })
            // console.log(obj)
     
        },
        //电影名查找
        async[ACTION_UP_NSEARCH]({commit},obj){
            let msg=await axios.get(IPCONFIG+'/upcoming/find',{
                params:{
                    CName:obj.CName,
                    page:obj.page,
                    rows:obj.rows
                }

            }) 
            console.log(msg)
            commit({
                type:MUTATION_UP_DATA,
                upcoming:msg.data
            })
        },
        //地区查找
        async[ACTION_UP_AREASEARCH]({commit},obj){
            let msg=await axios.get(IPCONFIG+'/upcoming/find',{
                params:{
                    area:obj.area,
                    page:obj.page,
                    rows:obj.rows
                }
            })
            commit({
                type:MUTATION_UP_DATA,
                upcoming:msg.data
            })
        }
    }
}