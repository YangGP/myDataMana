<template>
    <div>
        <el-button-group style="display:flex;">
<!--            增加电影-->
            <el-button icon="plus" @click="add">增加电影</el-button>
            <el-dialog title="增加电影" :visible.sync="addMovieBtn">
                <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
                    <el-form-item label="电影名">
                        <el-input v-model="CName" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="电影英文名">
                        <el-input v-model="EName" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-input v-model="type" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="电影评分">
                        <el-input v-model="score" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="演员">
                        <el-input v-model="actors" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="想看">
                        <el-input v-model="favor" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="区域">
                        <el-input v-model="area" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="年代">
                        <el-input v-model="year" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="时长">
                        <el-input v-model="duration" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="上映时间">
                        <el-input v-model="releaseDate" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="上映地区">
                        <el-input v-model="releaseArea" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="简介">
                        <el-input v-model="synopsis" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="总票房">
                        <el-input v-model="totalMoney" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="评分（人数）">
                        <el-input v-model="allSay" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="预告片">
                        <el-input v-model="prevue" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="支持类型">
                        <el-input v-model="cheakD" style='width:300px'></el-input>
                    </el-form-item>
<!--                   演员图片-->
                    <el-form-item label="演员图片">
                        <el-upload
                          class="upload-demo"
                          ref="upload"
                          multiple
                          action="http://127.0.0.1:3000/upload"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          :on-success='hanlsuccess'
                          :auto-upload="false">
                          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
<!--                    电影图片-->
                    <el-form-item label="电影图片">
                        <el-upload
                          class="upload-demo"
                          ref="uploadpic"
                          multiple
                          action="http://127.0.0.1:3000/upload"
                          :on-preview="handlePrevie"
                          :on-remove="handleRemov"
                          :on-success='hanlsucces'
                          :auto-upload="false">
                          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                          <el-button style="margin-left: 10px;" size="small" type="success" @click="MsubmitUpload">上传到服务器</el-button>
                          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
<!--                   电影大图-->
                    <el-form-item label="电影大图">
                        <el-upload
                          class="avatar-uploader"
                          action="http://127.0.0.1:3000/upload"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="imageUrl" :src="imageUrl" class="avatar" style='width:100px'>
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="addMovie">增加</el-button>
                        <el-button @click="upMovie">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
<!--            删除电影-->
            <el-button icon="delete" @click="del">移除电影</el-button>
<!--
            <el-dialog title="删除电影" :visible.sync="delMovieBtn">
                <p>确认删除？</p>
                <el-button type="primary" @click="addMovie">确定</el-button>
                <el-button @click="upMovie">取消</el-button>
            </el-dialog>
            <el-dialog title="提示" :visible.sync="choseMovie">
                <span>请选择至少一条数据</span>
                <el-button type="primary" @click="chose">确定</el-button>
            </el-dialog>
-->
            
<!--            修改电影-->
            <el-button icon="edit" @click="check">修改电影</el-button>
            <el-dialog title="修改电影" :visible.sync="checkMovieBtn">
                <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
                    <el-form-item label="电影名">
                        <el-input v-model="CName" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="电影英文名">
                        <el-input v-model="EName" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-input v-model="type" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="电影评分">
                        <el-input v-model="score" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="演员">
                        <el-input v-model="actors" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="想看">
                        <el-input v-model="favor" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="区域">
                        <el-input v-model="area" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="年代">
                        <el-input v-model="year" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="时长">
                        <el-input v-model="duration" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="上映时间">
                        <el-input v-model="releaseDate" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="上映地区">
                        <el-input v-model="releaseArea" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="简介">
                        <el-input v-model="synopsis" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="总票房">
                        <el-input v-model="totalMoney" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="评分（人数）">
                        <el-input v-model="allSay" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="预告片">
                        <el-input v-model="prevue" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="支持类型">
                        <el-input v-model="cheakD" style='width:300px'></el-input>
                    </el-form-item>
<!--                   演员图片-->
                    <el-form-item label="演员图片">
                        <el-upload
                          class="upload-demo"
                          ref="upload"
                          multiple
                          action="http://127.0.0.1:3000/upload"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          :on-success='hanlsuccess'
                          :auto-upload="false">
                          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
<!--                    电影图片-->
                    <el-form-item label="电影图片">
                        <el-upload
                          class="upload-demo"
                          ref="uploadpic"
                          multiple
                          action="http://127.0.0.1:3000/upload"
                          :on-preview="handlePrevie"
                          :on-remove="handleRemov"
                          :on-success='hanlsucces'
                          :auto-upload="false">
                          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                          <el-button style="margin-left: 10px;" size="small" type="success" @click="MsubmitUpload">上传到服务器</el-button>
                          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
<!--                   电影大图-->
                    <el-form-item label="电影大图">
                        <el-upload
                          class="avatar-uploader"
                          action="http://127.0.0.1:3000/upload"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="imageUrl" :src="imageUrl" class="avatar" style='width:100px'>
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="CheckMovie" >修改</el-button>
                        <el-button @click=nocheckMovie>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            
   
<!--        增加专业评论-->
            <el-button style="display:flex;" icon="plus" @click="addPorfessional">增加专业评论</el-button>
            <el-dialog title="增加专业评论" :visible.sync="addPingBtn">
                <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
                    <el-form-item label="用户名">
                        <el-input v-model="name" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="用户评论">
                        <el-input v-model="say" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="评分">
                        <el-input v-model="sayScore" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addMajorSay">增加</el-button>
                        <el-button @click="NoaddMajorSay">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
    <!--        增加用户评论-->
            <el-button style="display:flex;" icon="plus" @click="addUsered">增加用户评论</el-button>
            <el-dialog title="增加用户评论" :visible.sync="addUserBtn">
                <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
                    <el-form-item label="用户名">
                        <el-input v-model="name" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="评论">
                        <el-input v-model="say" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item label="评分">
                        <el-input v-model="sayScore" style='width:300px'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click='addUserSay'>增加</el-button>
                        <el-button @click='NoaddUserSay'>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
<!--            电影查询-->
            <div style="display:flex;">
                <el-input placeholder="请输入内容" v-model="selectInp">
                    <el-select v-model="select" slot="prepend" placeholder="请选择" style='width:90px'>
                        <el-option label="电影名" value="1"></el-option>
                        <el-option label="类型" value="2"></el-option>
                    </el-select>
                <el-button slot="append" icon="search" @click='slot'></el-button>
                </el-input>
            </div>
        </el-button-group>
<!--        页面数据-->
        <el-table :data="tableData" ref='multipleTable' @selection-change="handleSelectionChange" border tooltip-effect="dark" @row-click="toggleSelection" style="width: 100%" max-height="480">
            <el-table-column type='selection'></el-table-column>
            <el-table-column prop="CName" label="电影名" width="200"></el-table-column>
            <el-table-column prop="EName" label="电影英文名" width="220"></el-table-column>
            <el-table-column prop="type" label="类型"  width="100"></el-table-column>
            <el-table-column prop="score" label="电影评分"  width="100"></el-table-column>
            <el-table-column prop="actors" label="演员"  width="500"></el-table-column>
            <el-table-column prop="favor" label="想看"  width="100"></el-table-column>
            <el-table-column prop="area" label="区域"  width="100"></el-table-column>
            <el-table-column prop="year" label="年代"  width="100"></el-table-column>
            <el-table-column prop="duration" label="时长"  width="100"></el-table-column>
            <el-table-column prop="releaseDate" label="上映时间"  width="100"></el-table-column>
            <el-table-column prop="releaseArea" label="上映地区"  width="100"></el-table-column>
            <el-table-column prop="synopsis" label="简介"  width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="userSay" label="观众评论"  width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="majorSay" label="专业评论"  width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cheakD" label="支持类型"  width="100"></el-table-column>
            <el-table-column prop="totalMoney" label="总票房"  width="100"></el-table-column>
            <el-table-column prop="actorImg" label="演员图片"  width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="pictures" label="电影图片"  width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bigImg" label="电影大图"  width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="allSay" label="评分人数"  width="100" show-overflow-tooltip></el-table-column>
        </el-table>
<!--        分页-->
        <el-pagination @size-change="howpage" @current-change="chackPage" :current-page="thisCurpage" :page-sizes="[5, 10, 20]" :page-size="thisPagecell" layout="total, sizes, prev, pager, next,jumper" :total="total">
		</el-pagination>
	</div>
	
</template>


<script>
    import { ACTION_GET_DATA,ACTION_ADD_MOVIE,ACTION_DEL_MOVIE,ACTION_CHECK_MOVIE,ACTION_ADD_USERSAY,ACTION_ADD_MAJORSAY,ACTION_SLOT_MOVIE,ACTION_SLOT_LEI} from '../store/movie'
    export default{
        computed:{
            tableData(){
//                console.log(this.$store.state.Movie.tableData)
                return this.$store.state.Movie.tableData
            },
            thisCurpage(){
//                console.log(this.$store.state.Movie.curpage)
                return this.$store.state.Movie.curpage
            },
            thisPagecell(){
                return this.$store.state.Movie.pagecell
            },
            total(){
//                console.log(this.$store.state.Movie.total)
                return this.$store.state.Movie.total
            }
        },
        data(){
            return{
                addMovieBtn:false,
                delMovieBtn:false,
                checkMovieBtn:false,
                addPingBtn:false,
                addUserBtn:false,
                choseMovie:false,
                gridData:'',
                curpage: 1,
				pagecell: 10,
                multipleTable:'',
                multipleSelection:'',
                labelPosition: 'right',
                formLabelAlign: {
                  name: '',
                  region: '',
                  type: ''
                },
                CName:'',
                EName:'',
                type:'',
                score:'',
                actors:'',
                favor:'',
                area:'',
                year:'',
                duration:'',
                releaseDate:'',
                releaseArea:'',
                synopsis:'',
                totalMoney:'',
                select:'',
                selectInp:'',
                bigImg:'',
                pictures:'',
                actorImg:'',
                cheakD:'',
                prevue:'',
                allSay:'',
                userSay:'',
                majorSay:'',
                sayScore:'',
                say:'',
                name:'',
                say:'',
                sayScore:'',
                imageUrl:'',
                actorRes:[],
                movieRes:[],
                bigRes:[]
            }
        },
        created(){
            this.chackPage(1);
        },
        methods:{
                  
//            演员图片
            submitUpload() {
//                console.log(111)
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            hanlsuccess(response, file, fileList){
//                console.log(111)
                console.log(file)
                this.actorRes.push(response[0])
                console.log(this.actorRes)
            },
//            电影图片
            MsubmitUpload(){
                console.log(222)
                this.$refs.uploadpic.submit();
            },
            handleRemov(file, fileList) {
                console.log(file, fileList);
            },
            handlePrevie(file) {
                console.log(file);
            },
            hanlsucces(movieRes){
                this.movieRes.push(movieRes[0])
                console.log(this.movieRes)
            },
            //电影大图
            handleAvatarSuccess(bigRes, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.bigRes.push(bigRes[0])
                console.log(this.bigRes)
              },
              beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                  this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                  this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
              },
//            当前页数
            chackPage(val){
                this.curpage=val
                this.$store.dispatch({
                    type:ACTION_GET_DATA,
                    curpage: this.curpage,
                    pagecell: this.pagecell
                })
            },
//            每页显示条数变化
            howpage(val){
//                console.log(111)
                this.pagecell=val
                this.$store.dispatch({
                    type:ACTION_GET_DATA,
                    curpage: this.curpage,
                    pagecell: this.pagecell
                })
            },
//            选择条数和内容
            handleSelectionChange(val){
                this.multipleSelection = val;
                console.log(val)
            },
//            单选情况
            toggleSelection(row) {
                this.$refs.multipleTable.toggleRowSelection(row)
                console.log(row)
            },
//            点击增加
            add(){
                console.log('add')
                this.addMovieBtn=true
//                console.log(this.pagecell)
            },
//            确定增加电影
            addMovie(){
                
//                let MovieAry=[];
//                MovieAry.push()
                console.log(this.bigRes,this.movieRes,this.actorRes)
                this.$store.dispatch({
                    type:ACTION_ADD_MOVIE,
                    CName:this.CName,
                    EName:this.EName,
                    lei:this.type,
                    score:this.score,
                    actors:this.actors,
                    favor:this.favor,
                    area:this.area,
                    year:this.year,
                    duration:this.duration,
                    releaseDate:this.releaseDate,
                    releaseArea:this.releaseArea,
                    synopsis:this.synopsis,
                    totalMoney:this.totalMoney,
                    bigImg:this.bigRes,
                    pictures:this.movieRes,
                    actorImg:this.actorRes,
                    cheakD:this.cheakD,
                    prevue:this.prevue,
                    allSay:this.allSay,
                    userSay:this.userSay,
                    majorSay:this.majorSay,
                })
                this.addMovieBtn=false
                this.CName=''
                this.EName=''
                this.type=''
                this.score=''
                this.actors=''
                this.favor=''
                this.area=''
                this.year=''
                this.duration=''
                this.releaseDate=''
                this.releaseArea=''
                this.synopsis=''
                this.totalMoney=''
                this.bigRes=[]
                this.movieRes=[]
                this.actorRes=[]
                this.cheakD=''
                this.prevue=''
                this.allSay=''
                this.majorSay=''
                this.userSay=''
            },
            upMovie(){
                this.addMovieBtn=false
                this.CName=''
                this.EName=''
                this.type=''
                this.score=''
                this.actors=''
                this.favor=''
                this.area=''
                this.year=''
                this.duration=''
                this.releaseDate=''
                this.releaseArea=''
                this.synopsis=''
                this.totalMoney=''
                this.bigRes=[]
                this.movieRes=[]
                this.actorRes=[]
                this.cheakD=''
                this.prevue=''
                this.allSay=''
                this.majorSay=''
                this.userSay=''
            },
//            点击删除
            del(){
                let val=this.multipleSelection;
//                console.log(val.length)
                if(val.length>=1){
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        let arr=[];
                        for(let i=0;i<val.length;i++){
                            arr.push(val[i]._id)
                        }
                        this.$store.dispatch({
                            type:ACTION_DEL_MOVIE,
                            id:arr
                        })
//                        console.log(arr)
                    }).catch(()=>{
                        
                    })
                }
                else{
                    this.$confirm('请至少选择一条数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
//                        console.log('删除了')
                    }).catch(()=>{
//                        console.log('取消删除了')
                    })
                }
//                console.log('del')
//                this.delMovieBtn=true
            },
//            点击修改
            check(){
                let val=this.multipleSelection;
                if(val.length==1){
                    this.checkMovieBtn=true
                    this.CName=val[0].CName,
                    this.EName=val[0].EName,
                    this.type=val[0].type,
                    this.score=val[0].score,
                    this.actors=val[0].actors,
                    this.favor=val[0].favor,
                    this.area=val[0].area,
                    this.year=val[0].year,
                    this.duration=val[0].duration,
                    this.releaseDate=val[0].releaseDate,
                    this.releaseArea=val[0].releaseArea,
                    this.synopsis=val[0].synopsis,
                    this.totalMoney=val[0].totalMoney
//                    this.bigImg=val[0].bigImg,
//                    this.pictures=val[0].pictures,
//                    this.actorImg=val[0].actorImg,
                    this.cheakD=val[0].cheakD,
                    this.prevue=val[0].prevue,
                    this.allSay=val[0].allSay
                }else{
                    this.$confirm('至少选择一条数据', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        
                    })
//                    console.log('请选择一条数据')
                }
                
//                console.log('check')
            },
//            确认修改
            CheckMovie(){
                let val=this.multipleSelection;
                this.$store.dispatch({
                    type:ACTION_CHECK_MOVIE,
                    id:val[0]._id,
                    CName:this.CName,
                    EName:this.EName,
                    lei:this.type,
                    score:this.score,
                    actors:this.actors,
                    favor:this.favor,
                    area:this.area,
                    year:this.year,
                    duration:this.duration,
                    releaseDate:this.releaseDate,
                    releaseArea:this.releaseArea,
                    synopsis:this.synopsis,
                    totalMoney:this.totalMoney,
                    bigImg:this.bigRes[0],
                    pictures:this.movieRes[0],
                    actorImg:this.actorRes[0],
                    cheakD:this.cheakD,
                    prevue:this.prevue,
                    allSay:this.allSay
                })
//                console.log(val[0]._id)
                this.checkMovieBtn=false
            },
//            取消修改
            nocheckMovie(){
                this.checkMovieBtn=false
            },
//            增加专业评论
            addPorfessional(){
                let val=this.multipleSelection;
                if(val.length==1){
                    this.addPingBtn=true
                }else{
                    this.$confirm('至少选择一条数据', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        
                    })
                }
            },
//            确定增加专业评论
            addMajorSay(){
                let val=this.multipleSelection;
                let newary=val[0].majorSay;
                console.log(val[0].majorSay)
                let ary={
                    name:this.name,
                    say:this.say,
                    sayScore:this.sayScore
                };
                newary.push(ary)
//                console.log(newary)
                this.$store.dispatch({
                    type:ACTION_ADD_MAJORSAY,
                    id:val[0]._id,
                    majorSay:newary
                })
                this.addPingBtn=false
            },
//            取消增加专业评论
            NoaddMajorSay(){
                this.addPingBtn=false
            },
//            增加用户评论
            addUsered(){
                let val=this.multipleSelection;
                if(val.length==1){
                    this.addUserBtn=true
                }
                else{
                    this.$confirm('至少选择一条数据', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        
                    })
                }
            },
//            确定增加用户评论
            addUserSay(){
                let val=this.multipleSelection;
                let newary=val[0].userSay;
                console.log(val[0].userSay)
                let ary={
                    name:this.name,
                    say:this.say,
                    sayScore:this.sayScore
                };
                newary.push(ary)
                this.$store.dispatch({
                    type:ACTION_ADD_USERSAY,
                    id:val[0]._id,
                    userSay:newary
                })
                this.addUserBtn=false
            },
//            取消增加用户评论
            NoaddUserSay(){
                this.addUserBtn=false
            },
//            点击查询
            slot(){
//                console.log(this.select)
                switch(this.select){
                    case '1' :
                        this.$store.dispatch({
                            type:ACTION_SLOT_MOVIE,
                            CName:this.selectInp,
                            curpage: this.curpage,
                            pagecell: this.pagecell
                        })
                    break;
                    case '2' :
                        this.$store.dispatch({
                            type:ACTION_SLOT_LEI,
                            lei:this.selectInp,
                            curpage: this.curpage,
                            pagecell: this.pagecell
                        })
                    break;
                }
//                console.log(111)
            }
        }

    }
    
</script>


<style scoped>


</style>