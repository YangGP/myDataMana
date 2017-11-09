<template>
  <div>
    <div class='clickBtn'>
            <el-button-group>
                <el-button icon='plus' @click='add'>添加电影</el-button>
                <el-button  icon='delete' @click='removeData'>移除电影</el-button>
           
            </el-button-group>
            <el-input placeholder='请输入' v-model='search' class='search'>
                <el-select placeholder='请选择' slot='prepend' v-model="select">
                    <el-option v-for='item in options' :label='item.label' :value='item.select'></el-option>
                   
                </el-select>
                <el-button slot='append' icon='search' @click='searchTable'></el-button>
            </el-input>
        </div>
    <el-table ref="multipleTable" :data='upcomingData' border @selection-change='changeSelection' tooltip-effect='dark' style="width:100%" @row-click='toggleSelect' max-height="480">
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
      <el-table border ref="otherpleTable" :data="innerData" 
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
        <el-button type="primary" @click=addMovies>确 定</el-button>
      </div>
            <el-pagination
      
      @size-change="countChange"
      @current-change="moviesCurrentChange"
      :page-sizes="[10, 15, 20]"
      :page-size="innercell"
      layout="total, sizes, prev, pager, next, jumper"
      :total='moviesTotal'
      >
    </el-pagination>
    </el-dialog>
       <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :page-sizes="[10, 15, 20]" 
      :page-size="pagecell"
      :current-page='curpage'
      layout="total, sizes, prev, pager, next, jumper"
      :total='tableTotal' >
    </el-pagination>

  </div>



</template>


<script>
import{
  ACTION_UP_DATA,
  ACTION_UP_REMOVE,
  ACTION_UP_MOVIE,
  ACTION_UP_ADD,
  ACTION_UP_NSEARCH,
  ACTION_UP_AREASEARCH
} from '../store/upcoming'
  let dispatch;
  let Upcoming;
export default{

  created(){
    dispatch=this.$store.dispatch;
    Upcoming=this.$store.state.Upcoming;
    dispatch({
      type:ACTION_UP_DATA,
      page:Upcoming.curpage,
      rows:Upcoming.eachpage
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
    changeSelection(val){
      this.multipleSelection = val;
    },
     //点击添加初始化添加页面表格
    add(){
      this.movieTabVisible=true;
        dispatch({
            type:ACTION_UP_MOVIE,
            page:Upcoming.curpage,
            rows:Upcoming.eachpage
        })

    },
    //外面表格选择状况
    toggleSelect(row){
      this.$refs.multipleTable.toggleRowSelection(row);
      // console.log(row);
    },
       //里面表格选择集合
    innerChange(val){
      this.moviesDataSelection=val;
      // console.log(val)
    },
     //点击添加后的表格选择状况
    other(row){
      this.$refs.otherpleTable.toggleRowSelection(row)
    },
   //翻页
        sizeChange(val){
			console.log(val)
         // Onshow.pagecell=val;
			this.pagecell = val;
          dispatch({
              type:ACTION_UP_DATA,
              rows:val,
              page:this.pagecell
          })
        },
         // 页数改变
      currentChange(val){
		  this.currentpage
        // Onshow.curpage=val;
        dispatch({
          type:ACTION_UP_DATA,
          page:val,
          rows:this.pagecell
        })
      },
      //里面表格选择每页几条数据
    countChange(val){
      console.log(val)
      // Onshow.cell=val;
		this.innercell = val;
      dispatch({
        type:ACTION_UP_MOVIE,
		page:1,
        rows:this.innercell
        
      })
    },
     //里面表格的curpage
    moviesCurrentChange(val){
        // Onshow.cur=val;
        dispatch({
          type:ACTION_UP_MOVIE,
          page:val,
          rows:this.innercell
        })
    },
    //搜索
    searchTable(){
      switch(this.select){
        case '1':
        dispatch({
          type:ACTION_UP_NSEARCH,
          CName:this.search,
          page:this.currentpage,
          rows:this.pagecell
        })
        break;
        case '2':
        dispatch({
          type:ACTION_UP_AREASEARCH,
          area:this.search,
          page:this.currentpage,
          rows:this.pagecell
        })
      }
    },
       //添加电影
      addMovies(){
        let movies =this.moviesDataSelection;
        // console.log(movies);
        if(movies.length>0){

			let idArray = movies;
			console.log(idArray)
          dispatch({
            type:ACTION_UP_ADD,
            idArray
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
            
          })
        }
         
      
      },
      //移除电影
      removeData(){
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
                    type:ACTION_UP_REMOVE,
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
  }
 },
  

  computed:{
    //初始化表格
    upcomingData(){
      return this.$store.state.Upcoming.upData
    },
    innerData(){
      return this.$store.state.Upcoming.innerData
    },
    //总数量里面表格的
    moviesTotal(){
       return this.$store.state.Upcoming.allTotal
    },
    eachpage(){
       return this.$store.state.Upcoming.eachpage
    },
    tableTotal(){
        return this.$store.state.Upcoming.total
    },
      curpage(){
        return this.$store.state.Upcoming.curpage
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