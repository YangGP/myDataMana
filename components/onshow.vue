<template>
    <div>
        <div class='clickBtn'>
            <el-button-group>
                <el-button icon='plus' @click='add'>添加电影</el-button>
                <el-button  icon='delete' @click='remove'>移除电影</el-button>
           
            </el-button-group>
            <el-input placeholder='请输入' v-model='search' class='search'>
                <el-select placeholder='请选择' slot='prepend' v-model="select">
                    <el-option v-for='item in options' :label='item.label' :value='item.select'></el-option>
                   
                </el-select>
                <el-button slot='append' icon='search' @click='searchAll'></el-button>
            </el-input>
        </div>
    
        <el-table ref="multipleTable" @selection-change="handleSelectionChange" border :data='tabletableData' tooltip-effect='dark' style="width:100%" @row-click='toggleSelection' max-height="480">
			<el-table-column type='selection' ></el-table-column>
			<el-table-column label='电影名' prop='CName' width='150' ></el-table-column>
			<el-table-column label='英文名' prop='EName' width='150'></el-table-column>
			<el-table-column label='类型' prop='type' width='150'></el-table-column>
			<el-table-column label='区域' prop='area'></el-table-column>
			<el-table-column label='评分' prop='score'></el-table-column>
			<el-table-column label='演员' prop='actors' show-overflow-tooltip></el-table-column>
			<el-table-column label='年代' prop='year'></el-table-column>
			<el-table-column label='时长' prop='duration'></el-table-column>
			<el-table-column label='上映时间' prop='releaseDate' width="120"></el-table-column>
			<el-table-column label='上映区域' prop='releaseArea' width="120"></el-table-column>
			<el-table-column label='简介' class-name='cc' prop='synopsis' show-overflow-tooltip></el-table-column>
			<el-table-column label='总票房' prop='totalMoney' width='150'></el-table-column>
			<el-table-column label='图片' prop='pictures' show-overflow-tooltip></el-table-column>
		</el-table>
    
        <el-dialog size="large" title="添加电影" :visible.sync="movieTabVisible">
			<el-table border ref="otherpleTable" :data="moviesData" 
			 style="width: 100%" @row-click='other' @selection-change='innerChange'>
			<el-table-column type='selection'></el-table-column>
			<el-table-column label='电影名' prop='CName' width='150' ></el-table-column>
			<el-table-column label='英文名' prop='EName' width='150'></el-table-column>
			<el-table-column label='类型' prop='type' width='150'></el-table-column>
			<el-table-column label='区域' prop='area'></el-table-column>
			<el-table-column label='评分' prop='score'></el-table-column>
			<el-table-column label='演员' prop='actors' show-overflow-tooltip></el-table-column>
			<el-table-column label='年代' prop='year'></el-table-column>
			<el-table-column label='时长' prop='duration'></el-table-column>
			<el-table-column label='上映时间' prop='releaseDate' width="120"></el-table-column>
			<el-table-column label='上映区域' prop='releaseArea' width="120"></el-table-column>
			<el-table-column label='简介' class-name='cc' prop='synopsis' show-overflow-tooltip></el-table-column>
			<el-table-column label='总票房' prop='totalMoney' width='150'></el-table-column>
			<el-table-column label='图片' prop='pictures' show-overflow-tooltip></el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button @click="movieTabVisible = false">取 消</el-button>
				<el-button type="primary" @click="movieAdd" >确 定</el-button>
			</div>
       <el-pagination
      @size-change="moviesChange"
      @current-change="moviesCurrentChange"
      :page-sizes="[10, 15, 20]"
      :page-size="$store.state.Onshow.cell"
      layout="total, sizes, prev, pager, next, jumper"
      :total='moviesTotal' >
    </el-pagination>
		</el-dialog>
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 15, 20]" 
      :page-size="pagecell"
      :current-page='curpage'
      layout="total, sizes, prev, pager, next, jumper"
      :total='tableTotal' >
    </el-pagination>
    
    </div>




</template>
<script>
    import {
      ACTION_GET_DATAS,
      ACTION_DEL_DATAS,
      ACTION_MOVIES_DATAS,
      ACTION_MOVIES_ADD,
      ACTION_SEARCH_ONSHOW,
      ACTION_AREA_SEARCH,
      // MUTATION_SERRCH_TABLE
    } from '../store/onshow'
    let dispatch;
    let Onshow;
    export default{
        created(){
             dispatch = this.$store.dispatch;
             Onshow = this.$store.state.Onshow;
//            console.log(Onshow)
            dispatch({
                type:ACTION_GET_DATAS,
                page: 1,
                rows: this.pagecell
            })

        },
        data(){
            return{
                search:'',
                select:'',
                options:[{
                  select:'1',
                  label:'电影'
                },{
                  select:'2',
                  label:'区域'
                }],
                multipleSelection: [],
                movieTabVisible: false,
                message:false,
                moviesDataSelection:[],
				currentpage: 1,
				pagecell: 10,
				innercell: 10
            }

        },
          methods:{
            //外面表格选中集合
              handleSelectionChange(val) {
                this.multipleSelection = val;
                 
              },
              //里面表格选择集合
              innerChange(val){
                this.moviesDataSelection=val;
                // console.log(val)
              },
              //外面表格选择状况
              toggleSelection(row){
                this.$refs.multipleTable.toggleRowSelection(row);
                // console.log(row);
              },
              //点击添加后的表格选择状况
              other(row){
                this.$refs.otherpleTable.toggleRowSelection(row)
              },
              //点击添加初始化添加页面表格
              add(){
                this.movieTabVisible=true;
                  dispatch({
                      type:ACTION_MOVIES_DATAS,
                      page: 1,
                      rows: this.pagecell
                  })

              },
              //搜索
              searchAll(){
                // this.$store.commit({
                //   type:MUTATION_SERRCH_TABLE,
                //   searchType:this.select,
                //   searchText:this.search
                // })
                switch(this.select){
                  case '1':
                  dispatch({
                    type:ACTION_SEARCH_ONSHOW,
                    CName:this.search,
                    page: 1,
                    rows: this.pagecell
                  })
                  break;
                  case '2':
                  dispatch({
                    type:ACTION_AREA_SEARCH,
                    area:this.search,
                    page:1,
                    rows:this.eachpage
                  })
                }
              },
              //添加电影
              movieAdd(){
                let movies =this.moviesDataSelection;
                // console.log(movies);
                if(movies.length>0){
                
					let idArray = movies;
                  dispatch({
                    type:ACTION_MOVIES_ADD,
                    idArray
                    // _id:arr,
                    // max:arr.length
                  })
                     this.movieTabVisible=false;
                  this.$message({
                    type:'success',
                    message:'添加成功',
                    center:true
                  })
                  
                }else{
                   this.$message({
                    type:'warning',
                    message:'请选择要添加的数据',
                    center:true
                  })
                }
               
              },
              //移除电影
              remove(){
                  // console.log(1)
                  let movie= this.multipleSelection
                  if(movie.length>0){
                     this.$confirm('此操作将永久删除该文件','是否继续？','系统提示',{
                     confirmButtonText:'确定',
                     cancelButtonText:'取消',
                     type:'warning'
                     }).then(()=>{
                        let arr=[];
                        var idArray = movie.map((user) => {
                          arr.push(user._id);
                        })
                        dispatch({
                            type:ACTION_DEL_DATAS,
                            _id:arr
                        })
                        this.$message({
                          type:'success',
                          message:'删除成功'
                        })
                    })
                  }else{
                    this.$message({
                      type:'warning',
                      message:'请选择要删除的数据',
                    })
                  }
                 
              },

              //翻页
              handleSizeChange(val){
               // Onshow.pagecell=val;
				  this.currentpage = val;
                dispatch({
                    type:ACTION_GET_DATAS,
					page: this.currentpage,
                    rows: this.pagecell
                })
              },
              // 页数改变
              handleCurrentChange(val){
                // Onshow.curpage=val;
				  this.currentpage = val;
                dispatch({
                	type:ACTION_GET_DATAS,
                	page: this.currentpage,
					rows: this.pagecell
                })
              },
              //里面表格选择每页几条数据
              moviesChange(val){
                // Onshow.cell=val;
                dispatch({
                  type:ACTION_MOVIES_DATAS,
                  page: 1,
					rows: this.pagecell
                })
              },
              //里面表格的curpage
              moviesCurrentChange(val){
                  // Onshow.cur=val;
                  dispatch({
                    type:ACTION_MOVIES_DATAS,
					  rows: this.pagecell,
                    page:val
                  })
              }
           },
            computed:{
                tabletableData(){
                    return this.$store.state.Onshow.tableData
                },
                tableTotal(){
                    return this.$store.state.Onshow.total
                },
                moviesData(){
                  return this.$store.state.Onshow.moviesData
                },

                moviesTotal(){
                   return this.$store.state.Onshow.moviesTotal
                },
                pagecell(){
                  return this.$store.state.Onshow.pagecell
                },
                curpage(){
                  return this.$store.state.Onshow.curpage
                }
            }
    }
</script>

<style>
     .clickBtn{
        display: flex;
    }
    .el-select .el-input{
        width: 90px;
    }
    .search{
        width: 40%;
    }
</style>