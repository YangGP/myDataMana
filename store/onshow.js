import axios from 'axios'
//*-----------------------------------同步-------------------------------------*/
//初始化页面onshow里的数据
export const MUTATION_SET_TABLE='SET_TABLE'
//初始化movies里面的数据
export const MUTATION_MOVIES_TABLE='GE_MOVIES'
//搜索
// export const MUTATION_SERRCH_TABLE='MUTATION_SERRCH_TABLE'

//------------------------------------异步-------------------------------------

//初始化页面
export const ACTION_GET_DATAS='GET_DATAS'
//删除数据
export const ACTION_DEL_DATAS='DEL_DATA'
//初始化添加里面的表格
export const ACTION_MOVIES_DATAS='MOVIES_DATA'
//添加数据
export const ACTION_MOVIES_ADD='ACTION_MOVIES_ADD'
//搜索按照电影名
export const ACTION_SEARCH_ONSHOW='ACTION_SEARCH_ONSHOW'
//按照地区搜索
export const ACTION_AREA_SEARCH='ACTION_AREA_SEARCH'

const IPCONFIG = 'http://127.0.0.1:3000'

export default{
    state:{
       tableData:[],
        pagecell:10,
        curpage:1,
        total:1,
        //里面表格的数据
        moviesData:[],
        cell:10,
        cur:1,
        moviesTotal:1

        
    },
    mutations:{
       [MUTATION_SET_TABLE](state,obj){
           state.tableData=obj.onshow.rows;
           state.curpage=obj.onshow.curpage;
           state.total=obj.onshow.total;  
       },
        [MUTATION_MOVIES_TABLE](state,obj){
            state.moviesData=obj.movies.rows
            state.moviesTotal=obj.movies.total; 
       }
       // //搜索
       // [MUTATION_SERRCH_TABLE](state,obj){
       //      console.log(obj)
       //      switch(obj.searchType){
       //          case '1':
       //          state.tableData=state.tableData.filter(item=>item.CName.indexOf(obj.searchText)!=-1)
       //          break;
       //          case '2':
       //          state.tableData=state.tableData.filter(item=>item.area.indexOf(obj.searchText)!=-1)
       //          break;
       //          default:
       //          state.tableData=state.tableData
       //      }
       // }
    },
    //初始化表格
    actions:{
        async[ACTION_GET_DATAS]({commit},obj){
            let msg=await axios.get(IPCONFIG+'/onshow/find',{
                params:{
                    //当前页数
                    page:obj.page,
                    //每页行数
                    rows:obj.rows
                }
            })
            // console.log(msg)
            commit({
                type:MUTATION_SET_TABLE,
                onshow:msg.data
            })
        },
        //删除
        async[ACTION_DEL_DATAS]({commit},obj){
            let msg=await axios.get(IPCONFIG+'/onshow/del',{
                params:{
                    ids:obj._id
                }
            })
            // console.log(obj);
            commit({
                type:MUTATION_SET_TABLE,
                onshow:msg.data
            })
        },
        //初始化添加里面的表格
        async[ACTION_MOVIES_DATAS]({commit},obj){
            let msg=await axios.get(IPCONFIG+'/Movie/find',{
                params:{
                    page:obj.page,
                    rows:obj.rows
                }
            })
            // console.log(obj)
            commit({
                type:MUTATION_MOVIES_TABLE,
                movies:msg.data
            })
        },
        //添加数据
        async[ACTION_MOVIES_ADD]({commit,dispatch,state},obj){
            for(let i=0;i<obj.idArray.length;i++){
				let mid = obj.idArray[i]._id;
				delete obj.idArray[i]._id;
				
                let msg=await axios.get(IPCONFIG+'/onshow/add',{
                    params:obj.idArray[i]
                })
				
				let insertid = msg.data.insertedIds[0];
				console.log(insertid)
				await axios.get(IPCONFIG+'/onshow/update',{
					params:{
						_id: insertid,
						mid
					}
				})
                
            }
            dispatch({
                type:ACTION_GET_DATAS,
                page:state.curpage,
                rows:state.pagecell
            })
            // console.log(obj)
     
        },
               //电影名查找
        async[ACTION_SEARCH_ONSHOW]({commit},obj){
            let msg=await axios.get(IPCONFIG+'/onshow/find',{
                params:{
                    CName:obj.CName,
                    page:obj.page,
                    rows:obj.rows
                }

            }) 
            console.log(msg)
            commit({
                type:MUTATION_SET_TABLE,
                onshow:msg.data
            })
        },
      //地区查找
        async[ACTION_AREA_SEARCH]({commit},obj){
            let msg=await axios.get(IPCONFIG+'/onshow/find',{
                params:{
                    area:obj.area,
                    page:obj.page,
                    rows:obj.rows
                }
            })
            commit({
                type:MUTATION_SET_TABLE,
                onshow:msg.data
            })
        }
  }
      
}
