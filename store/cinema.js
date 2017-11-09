//---------------------异步---------------------
export var ACTIONS_CINEMES ='ACTIONS_CINEMES'
export var ACTIONS_SEAT ='ACTIONS_SEAT'
export var ACTIONS_IMAX='ACTIONS_IMAX'
export var ACTIONS_CHANGE='ACTIONS_CHANGE'
export var ACTIONS_PROJECTION='ACTIONS_PROJECTION'
export var ACTIONS_DELETE='ACTIONS_DELETE'
export var ACTIONS_SETDELETE='ACTIONS_SETDELETE'
export var ACTIONS_MOVIESET='ACTIONS_MOVIESET'
export var ACTIONS_LINESEARCH='ACTIONS_LINESEARCH'
export var ACTIONS_ADDRESSSEARCH='ACTIONS_ADDRESSSEARCH'
export var ACTIONS_CHANGEMOVIE='ACTIONS_CHANGEMOVIE'
export var ACTIONS_IDLIST='ACTIONS_IDLIST'


//----------------------同步---------------------
export var MUTATIONS_UPDATE='MUTATIONS_UPDATE'
export var MUTATIONS_SEAT='MUTATIONS_SEAT'
export var MUTATIONS_CHANGE='MUTATIONS_CHANGE'
export var MUTATIONS_LINESEARCH='MUTATIONS_LINESEARCH'

const IPCONFIG = 'http://127.0.0.1:3000'

import axios from 'axios'
export default{
    state:{
        maxpage:1,
        eachpage:10,
        curpage:1,
        total:0,
        num:0,
        niceSeat:[],
        projName:[],
        cinema:[]
    },
    mutations:{
        [MUTATIONS_UPDATE](state,obj){
           state.cinema=obj.name.rows
//           state.total=obj.all
//           state.maxpage=obj.max
           state.total=obj.name.total
           state.maxpage=obj.name.maxpage
       },
        [MUTATIONS_SEAT](state,obj){
            state.seatId.push(obj.seatId)
        },
        [MUTATIONS_CHANGE](state,obj){
            state.niceSeat=obj.niceSeat
            console.log(state.niceSeat)
        }
    },
    actions:{
 //初始化页面
        async [ACTIONS_CINEMES]({commit},obj){
            let msg=await axios.get(IPCONFIG + '/cinemas/find',{
                params:{
                    page:obj.page,
                    rows:obj.rows
                }
            })
            commit({
                type:MUTATIONS_UPDATE,
                name:msg.data,
//                all:msg.data.total,
//                max:msg.data.maxpage
            })
        },
 //增加座位
        async [ACTIONS_SEAT]({commit,dispatch,state},obj){
            let flag=0;
            let seatID=[]
            for(let i=0;i<obj.longs;i++){
                let msg=await axios.get(IPCONFIG + '/projection/add',{
                    params:{
                         projName:obj.projName[i].value,
                         seats:obj.projName[i].seat
                    }
                })
                seatID.push(msg.data.insertedIds[0])
                if(flag==obj.longs-1){
                    let msg=await axios.get(IPCONFIG+'/cinemas/add',{
                        params:{
                                projection:JSON.stringify(seatID),
                                cinemaName:obj.cinemaName,
                                address:obj.address,
                                tel:obj.tel,
                                webAdress:obj.webAdress
                            }
                        })

                }
                flag++;
           }  
            
            dispatch({
                type:ACTIONS_CINEMES,
                page:state.curpage,
                rows:state.eachpage
            })

        },
 //修改
        async [ACTIONS_CHANGE]({commit},obj){
            let msg=await axios.get(IPCONFIG+'/cinemas/find',{
                params:{
                    _id:obj.id
                }
            })
            let projection=msg.data.projection
            let flags=0;
            let niceArr=[];
            for(let i=0;i<projection.length;i++){
                let data=await axios.get(IPCONFIG+'/projection/find',{
                    params:{
                        _id:projection[i]
                    }
                })
                niceArr.push(data.data)
                if(flags==projection.length-1){
                     commit({
                        type:MUTATIONS_CHANGE,
                        niceSeat:niceArr
                    })
                }
               flags++;
            }
        },
 //影院座位修改
        async [ACTIONS_PROJECTION]({commit},obj){
             
             for(let i=0;i<obj.seatLongs;i++){
               let data=await axios.get(IPCONFIG+'/projection/update',{
                   params:{
                    _id:obj.id[i],
                    projName:obj.content[i].projName,
                    seats:obj.content[i].seats
                   }
               })
           }
        },
 //删除座位信息
        async [ACTIONS_DELETE]({commit},obj){
             
             for(let i=0;i<obj.long;i++){
               let data=await axios.get(IPCONFIG+'/projection/del',{
                   params:{
                    _id:obj.id[i]
                   }
               })
           }
        },
 //删除每条信息
        async [ACTIONS_SETDELETE]({commit},obj){
               let data=await axios.get(IPCONFIG+'/cinemas/del',{
                   params:{
                    _id:obj.id
                   }
               })
        },
 //添加观影套餐
        async [ACTIONS_MOVIESET]({commit},obj){
               let data=await axios.get(IPCONFIG+'/cinemas/update',{
                   params:{
                    _id:obj.id,
                    text:obj.text,
                    content:obj.content,
                    priceRed:obj.priceRed,
                    priceAll:obj.priceAll
                   }
               })
               console.log(data.data)
        },
 //影院信息修改
        async [ACTIONS_CHANGEMOVIE]({commit},obj){
            var msg=axios.get(IPCONFIG+'/cinemas/update',{
                params:{
                    _id:obj.id,
                    cinemaName:obj.cinemaName,
                    address:obj.address,
                    tel:obj.tel,
                    webAdress:obj.webAdress
                }
            })
        },
        //        按院线名查询
        async [ACTIONS_LINESEARCH]({commit,dispatch,state},obj){
               let data=await axios.get(IPCONFIG+'/cinemas/find',{
                   params:{
                        cinemaName:obj.cinemaName,
                        page:obj.page,
                        rows:obj.rows
                   }
               })
               commit({
                   type:MUTATIONS_UPDATE,
                   name:data.data
               })
        },
//        按地址查询
        async [ACTIONS_ADDRESSSEARCH]({commit,dispatch,state},obj){
           
               let data=await axios.get(IPCONFIG+'/cinemas/find',{
                   params:{
                        address:obj.address,
                        page:obj.page,
                   }
               })   
               commit({
                   type:MUTATIONS_UPDATE,
                   name:data.data
               })
        },
//        多选删除
        async [ACTIONS_IDLIST]({commit,dispatch,state},obj){
            console.log(obj)
             for(let i=0;i<obj.longs;i++){
               let data=await axios.get(IPCONFIG+'/projection/del',{
                   params:{
                        _id:obj.id[i]
                   }
               })   
             } 
        },
    }
}