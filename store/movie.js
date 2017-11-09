import axios from 'axios'
    
/*-----------------------------------同步---------------------------------------*/
export const MUTATION_SET_TABLE='MUTATION_SET_TABLE'
    
/*-----------------------------------异步---------------------------------------*/
export const ACTION_GET_DATA='ACTION_GET_DATA'
export const ACTION_ADD_MOVIE='ACTION_ADD_MOVIE'
export const ACTION_DEL_MOVIE='ACTION_DEL_MOVIE'
export const ACTION_CHECK_MOVIE='ACTION_CHECK_MOVIE'
export const ACTION_ADD_USERSAY='ACTION_ADD_USERSAY'
export const ACTION_ADD_MAJORSAY='ACTION_ADD_MAJORSAY'
export const ACTION_SLOT_MOVIE='ACTION_SLOT_MOVIE'
export const ACTION_SLOT_LEI='ACTION_SLOT_LEI'
    
const IPCONFIG = 'http://127.0.0.1:3000'

export default{
    state:{
        tableData:[],
        curpage:1,
        pagecell:10,
        maxpage:1,
        total:10
    },
    mutations: {
//        分页+显示数据
        [MUTATION_SET_TABLE] (state,obj){
            state.maxpage=obj.onshow.maxpage
            state.tableData=obj.onshow.rows
            state.curpage=obj.onshow.curpage
            state.pagecell=obj.onshow.pagecell
            state.total=obj.onshow.total
//            console.log(state.maxpage)
        }
    },
    actions: {
//        获取数据库数据
        async [ACTION_GET_DATA]({commit},obj){
            let msg=await axios.get(IPCONFIG+'/Movie/find', {
				params: {
					page: obj.curpage,
					rows: obj.pagecell
                }
            })
            console.log(msg.data);
            commit({
                type:MUTATION_SET_TABLE,
                onshow:msg.data
            })
        },
//        增加电影到数据库
        async [ACTION_ADD_MOVIE]({commit},obj){
            let msg=await axios.get(IPCONFIG+'/Movie/add', {
				params: {
					CName:obj.CName,
                    EName:obj.EName,
                    type:obj.lei,
                    score:obj.score,
                    actors:obj.actors,
                    favor:obj.favor,
                    area:obj.area,
                    year:obj.year,
                    duration:obj.duration,
                    releaseDate:obj.releaseDate,
                    releaseArea:obj.releaseArea,
                    synopsis:obj.synopsis,
                    totalMoney:obj.totalMoney,
                    bigImg:obj.bigImg,
                    pictures:obj.pictures,
                    actorImg:obj.actorImg,
                    cheakD:obj.cheakD,
                    prevue:obj.prevue,
                    allSay:obj.allSay,
                    userSay:obj.userSay,
                    majorSay:obj.majorSay
                }
            })
            console.log(msg.data);
            commit({
                type:MUTATION_SET_TABLE,
                onshow:msg.data
            })
        },
//        删除数据库的电影
        async [ACTION_DEL_MOVIE]({commit},obj){
            console.log(obj.id)
            let msg=await axios.get(IPCONFIG+'/Movie/del', {
				params: {
					ids:obj.id
                }
            })
            console.log(msg.data)
            commit({
                type:MUTATION_SET_TABLE,
                onshow:msg.data
                
            })
        },
//        修改数据库电影
        async [ACTION_CHECK_MOVIE]({commit},obj){
            console.log(obj.id)
            let msg=await axios.get(IPCONFIG+'/Movie/update', {
				params: {
					_id:obj.id,
                    CName:obj.CName,
                    EName:obj.EName,
                    type:obj.lei,
                    score:obj.score,
                    actors:obj.actors,
                    favor:obj.favor,
                    area:obj.area,
                    year:obj.year,
                    duration:obj.duration,
                    releaseDate:obj.releaseDate,
                    releaseArea:obj.releaseArea,
                    synopsis:obj.synopsis,
                    totalMoney:obj.totalMoney,
                    bigImg:obj.bigImg,
                    pictures:obj.pictures,
                    actorImg:obj.actorImg,
                    cheakD:obj.cheakD,
                    prevue:obj.prevue,
                    allSay:obj.allSay
                }
            })
            console.log(msg.data)
            commit({
                type:MUTATION_SET_TABLE,
                onshow:msg.data
                
            })
        },
//        确认添加用户评论
        async [ACTION_ADD_USERSAY]({commit},obj){
            console.log(obj.id)
            let msg=await axios.get(IPCONFIG+'/Movie/update', {
				params: {
					_id:obj.id,
					
                    userSay:obj.userSay
                }
            })
            console.log(msg.data)
            commit({
                type:MUTATION_SET_TABLE,
                onshow:msg.data
                
            })
        },
//        确认添加专业评论
        async [ACTION_ADD_MAJORSAY]({commit},obj){
            console.log(obj.id)
            let msg=await axios.get(IPCONFIG+'/Movie/update', {
				params: {
					_id:obj.id,
                    majorSay:obj.majorSay
                }
            })
            console.log(msg.data)
            commit({
                type:MUTATION_SET_TABLE,
                onshow:msg.data
                
            })
        },
//        按电影名查找
        async [ACTION_SLOT_MOVIE]({commit},obj){
            let msg=await axios.get(IPCONFIG+'/Movie/find', {
				params: {
					CName:obj.CName,
                    page: obj.curpage,
					rows: obj.pagecell
                }
            })
            console.log(msg.data)
            commit({
                type:MUTATION_SET_TABLE,
                onshow:msg.data
                
            })
        },
//        按类型查找
        async [ACTION_SLOT_LEI]({commit},obj){
            let msg=await axios.get(IPCONFIG+'/Movie/find', {
				params: {
					type:obj.lei,
                    page: obj.curpage,
					rows: obj.pagecell
                }
            })
            console.log(msg.data)
            commit({
                type:MUTATION_SET_TABLE,
                onshow:msg.data
                
            })
        }
    }
}