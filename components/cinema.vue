<template>
    <div>
<!--        表格操作-->
       <el-button-group>
              <el-button icon="plus" @click='dialogFormVisible=true'>添加院线</el-button>
              <el-button icon="delete" @click='deletes'>移除院线</el-button>
              <el-button icon="plus" @click='showbounced'>添加观影套餐</el-button>
       </el-button-group>
        <el-button-group>
            <div style='margin-left:-5px'>
                 <el-input placeholder="请输入内容" v-model="input5">
                    <el-select v-model="select" slot="prepend" placeholder="请选择"  style='width:90px'>
                    <el-option v-for='item in options' :label="item.label" :value="item.select"></el-option>
                    </el-select>
                    <el-button slot="append" icon="search" @click='search'></el-button>
                 </el-input>
            </div>
        </el-button-group>
<!--        表格内容-->
        <div class="header">
           <el-table ref='multip' highlight-current-row :data="rows" border style="width: 100%"  @selection-change='changeFun' @row-click='setCurrent'>
                <el-table-column type='index' width="70" align='center' label='序号'></el-table-column>
                <el-table-column type="selection" width="55" align='center'></el-table-column>
                <el-table-column  prop="cinemaName" label="院线名" align='center'> </el-table-column>
                <el-table-column prop="address" label="地址" align='center'> </el-table-column>
                <el-table-column prop="tel" label="电话" align='center'> </el-table-column>
                <el-table-column prop="webAdress" label="官网" align='center'> </el-table-column>
                <el-table-column label="操作" width="150" align='center'>
<!--        删除表格信息确认-->
                    <template scope="scope">
                       <el-popover ref="popover5" placement="top" width="30" v-model="scope.row.visible2">
                          <p>确定删除该条信息吗？</p>
                          <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="noclear(scope.row)">取消</el-button>
                            <el-button type="primary" size="mini" @click="deleteRow(scope.$index, rows)">确定</el-button>
                          </div>
                       </el-popover>
                       <el-button @click='checkCinema(scope.row)' type="success" size="small">编辑</el-button>
                       <el-button size="small" type='danger' v-popover:popover5>删除</el-button>
                    </template>
               </el-table-column>
          </el-table>
           <!--分页-->
        <div class="block">
              <el-pagination
                layout="total,sizes, prev, pager, next,jumper"
                @current-change='changepage' 
                @size-change="handleSizeChange"          
                :page-sizes="[5, 10, 15, 20]"             
                :page-size="$store.state.cinemas.eachpage"            
                :total="$store.state.cinemas.total">
              </el-pagination>
        </div>
        </div>
     
<!--        添加影院-->
        
       <el-dialog :close-on-click-modal='ok' :lock-scroll='ok' id='dialog' title="添加影院" :visible.sync="dialogFormVisible" >
           <el-collapse v-model="activeNames" >
             <el-collapse-item title="增加院线" name="1" >
                  <el-form :model="form" :rules='rules2' ref='form'>
                    <el-form-item label="院线名" :label-width="formLabelWidth" prop='name'>
                        <el-input v-model="form.name" style='width:270px'></el-input>
                    </el-form-item>
                    <el-form-item label="地址" :label-width="formLabelWidth" prop='address'>
                        <el-input v-model="form.address" style='width:270px'></el-input>
                    </el-form-item>
                    <el-form-item label="热线" :label-width="formLabelWidth" prop='phone'>
                        <el-input v-model="form.phone" style='width:270px'></el-input>
                    </el-form-item>
                    <el-form-item label="官网" :label-width="formLabelWidth" prop='network'>
                        <el-input v-model="form.network" style='width:270px'></el-input>
                    </el-form-item>
                 </el-form>
             </el-collapse-item>   
           
<!--            折叠面板-->
           
<!--           增加影院-->     
              <el-collapse-item title="增加影厅" name="1" >
                    <el-form :model="cinemaNew" ref="cinemaNew" >
                        <el-form-item class='formitem' :label-width="formLabelleft" v-for="(domain, index) in cinemaNew.domains" :label="'影厅名'+(index+1)" :key="domain.key" :prop="'domains.' + index + '.key'">
                            <el-input v-model="domain.value"  style='width:270px' ></el-input>
                            <el-button  type='text' @click.prevent="removeDomain(domain)">删除</el-button>
                            <p style='margin-left:-42px;margin-top:10px'>
                                <label style='margin-right:10px'>座位</label>
                                <el-input  style='width:270px' v-model="domain.seat"> </el-input>
                                <el-button  type='text' @click='change(index)' >预览</el-button>
                            </p>  
                            <div class="box">
                                    <div style='height:20px' v-for='(value,i) in cinemaNew.domains[index].newSeat'>
                                        <span v-for='(item,j) in value'>
                                                <img v-if='item==1' src='../assets/b.png'/>
                                                <img v-else src='../assets/a.png'/>
                                            
                                        </span>
                                   </div>
                            </div>    
                        </el-form-item>
                    </el-form>
                    <el-button style='margin-left:260px' @click='addDomain'>增加院线</el-button>
              </el-collapse-item>

         </el-collapse>
           
<!--           添加取消按钮-->
         <div slot="footer" class="dialog-footer">
            <el-button @click="abolish('form')">取 消</el-button>
            <el-button  @click="submitForm('form',cinemaNew.domains.length)">添 加</el-button>
          </div>
      </el-dialog>
        
<!--       添加前的 预览-->
        
        <el-dialog :close-on-click-modal='ok' :lock-scroll='ok' title="影院" :visible.sync="cinemadialog">
               <div v-for='(value,i) in arr'>
                    <span v-for='(item,j) in value'>
                        <img v-if='item==1' src='../assets/b.png'/>
                        <img v-else src='../assets/a.png'/>
                    </span>
               </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cinemadialog = false">取 消</el-button>
                <el-button type="primary" @click="cinemadialog = false">确 定</el-button>
              </div>
        </el-dialog>
       
<!--        添加观影套餐-->
        <el-dialog :close-on-click-modal='ok' :lock-scroll='ok' width='30%' id='dialog' title="添加观影套餐" :visible.sync="goodsdialog"   >

<!--
                 <el-upload
                  ref="upload"          
                  class="upload-demo"
                  action="https://127.0.0.1:3000/upload" 
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="addGoodsImg"
                  list-type="picture"
                    style='margin:auto;width:270px'>
                  <el-button size="small" type="primary">上传图片</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
-->

                 <el-form :model="setMeal" ref="setMeal" style='margin-top:20px'>
                      <el-form-item label="套餐名" :label-width="formLabelleft" prop='text'>
                        <el-input v-model="setMeal.text" style='width:270px'></el-input>
                    </el-form-item>
                    <el-form-item label="套餐介绍" :label-width="formLabelleft" prop='content'>
                        <el-input v-model="setMeal.content" style='width:270px'></el-input>
                    </el-form-item>
                    <el-form-item label="优惠价" :label-width="formLabelleft" prop='priceRed'>
                        <el-input v-model="setMeal.priceRed" style='width:270px'></el-input>
                    </el-form-item>
                    <el-form-item label="原价" :label-width="formLabelleft" prop='priceAll'>
                        <el-input v-model="setMeal.priceAll" style='width:270px'></el-input>
                    </el-form-item>
                     <el-form-item label="已售" :label-width="formLabelleft" prop='outprit'>
                        <el-input v-model="setMeal.outprit" style='width:270px'></el-input>
                    </el-form-item>
 
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button  @click="addGoods">添 加</el-button>
            </div>
        </el-dialog>
     
        
<!--        修改后的电影预览
         <el-dialog :close-on-click-modal='ok' :lock-scroll='ok' title="影院" :visible.sync="amengdingdialog">
               <div style='padding-left:150px' v-for='(value,i) in amendinng'>
                    <span v-for='(item,j) in value'>
                          <img v-if='item==1' src='../assets/b.png'/>
                        <img v-else src='../assets/a.png'/>
                    </span>
               </div>
               <div slot="footer" class="dialog-footer">
                    <el-button @click="amengdingdialog = false">取 消</el-button>
                    <el-button type="primary" @click="amengdingdialog = false">确 定</el-button>
               </div>
        </el-dialog>
        
        
<!--        修改影院-->
        
        <el-dialog :close-on-click-modal='ok' :lock-scroll='ok' title='修改影院' :visible.sync="dialogFormnewSeat" >
            <el-form :model="newSeatss" :rules='rules1' ref='newSeatss'>
                <el-form-item label="院线名" :label-width="formLabelWidth" prop='cinemaName'>
                    <el-input v-model="newSeatss.cinemaName" style='width:280px'></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth" prop='address'>
                    <el-input v-model="newSeatss.address" style='width:280px'></el-input>
                </el-form-item>
                <el-form-item label="热线" :label-width="formLabelWidth" prop='tel'>
                    <el-input v-model="newSeatss.tel" style='width:280px'></el-input>
                </el-form-item>
                <el-form-item label="官网" :label-width="formLabelWidth" prop='webAdress'>
                    <el-input v-model="newSeatss.webAdress" style='width:280px'></el-input>
                </el-form-item>
           </el-form>
<!--            显示影院-->
           
            <el-form v-for='(value,i) in changeSeat'>
                <el-form-item label="院线名" :label-width="formLabelWidth" prop='cinemaName'>
                    <el-input v-model="value.projName" style='width:280px'></el-input>
                </el-form-item>
                <el-form-item class='right' label="座位" :label-width="formLabelWidth" prop='address'>
                    <el-input v-model="value.seats" style='width:280px'></el-input>
                    <el-button  type='text' @click='online(i)'>预览</el-button>
                </el-form-item>
            
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="clear">取 消</el-button>
                <el-button type="primary" @click="changeCinema('newSeatss')">修 改</el-button>
             </div>
        </el-dialog>
    </div>
</template>
<script>
    import {
        ACTIONS_CINEMES,
        ACTIONS_SEAT,
        ACTIONS_IMAX,
        ACTIONS_CHANGE,
        ACTIONS_PROJECTION,
        ACTIONS_DELETE,
        ACTIONS_SETDELETE,
        ACTIONS_MOVIESET,
        ACTIONS_LINESEARCH,
        ACTIONS_ADDRESSSEARCH,
        MUTATIONS_LINESEARCH,
        ACTIONS_CHANGEMOVIE,
        ACTIONS_IDLIST
    } from '../store/cinema'
    import axios from 'axios'
    let dispatch;
    let cinemas;
    let array=[];
    let flag=false;
    export default {
        data(){
            //院线名验证
           var addCinema=(rule,value,callback)=>{
               if(value===''){
                   callback(new Error('请输入院线名'));
               }
               if(this.form.name!==''){
                   let reg=/^[\u4E00-\u9FA5]{1,10}|\d+|\w+$/g
                   if(reg.test(value)){
                        callback();
                   }else{
                       callback(new Error('请输入中文英文字符'));
                   }
               }
           }
           //地址验证
           var addAddress=(rule,value,callback)=>{
               if(value===''){
                   callback(new Error('请输入地址'));
               }
               if(this.form.address!==''){
                   let regs=/^[\u4E00-\u9FA5]{1,10}|\d+|\w+$/g
                   if(regs.test(value)){
                     callback();
                   }else{
                       callback(new Error('请输入中文英文字符'));
                   }
               }
           }
           //电话验证
           var addHotline=(rule,value,callback)=>{
               if(value===''){
                   callback(new Error('请输入电话号码'));
               }
               if(this.form.phone!==''){
                   let regs=/^\d{11}$/g
                   if(regs.test(value)){
                     callback();
                   }else{
                       callback(new Error('请输入11位数字'));
                   }
               }
           }
           //官网验证
           var addWeb=(rule,value,callback)=>{
               if(value===''){
                   callback(new Error('请输入官方网址'));
               }
               if(this.form.network!==''){
                   let regs=/^\w{3}\.\w{2,6}\.\w{2,6}$/
                   if(regs.test(value)){
                      callback();
                   }else{
                       callback(new Error('请输入www.xxx.xxx格式网址'));
                   }
               }
           }
           
           //修改验证
           
           //院线名验证
           var changeCinema=(rule,value,callback)=>{
               if(value===''){
                   callback(new Error('请输入院线名'));
               }
               if(this.newSeatss.cinemaName!==''){
                   let reg=/^[\u4E00-\u9FA5]{1,10}|\d+|\w+$/g
                   if(reg.test(value)){
                        callback();
                   }else{
                       callback(new Error('请输入中文英文字符'));
                   }
               }
           }
           //地址验证
           var changeAddress=(rule,value,callback)=>{
               if(value===''){
                   callback(new Error('请输入地址'));
               }
               if(this.newSeatss.address!==''){
                   let regs=/^[\u4E00-\u9FA5]{1,10}|\d+|\w+$/g
                   if(regs.test(value)){
                     callback();
                   }else{
                       callback(new Error('请输入中文英文字符'));
                   }
               }
           }
           //电话验证
           var changeHotline=(rule,value,callback)=>{
               if(value===''){
                   callback(new Error('请输入电话号码'));
               }
               if(this.newSeatss.tel!==''){
                   let regs=/^\d{11}$/g
                   if(regs.test(value)){
                     callback();
                   }else{
                       callback(new Error('请输入11位数字'));
                   }
               }
           }
           //官网验证
           var changeWeb=(rule,value,callback)=>{
               if(value===''){
                   callback(new Error('请输入官方网址'));
               }
               if(this.newSeatss.webAdress!==''){
                   let regs=/^\w{3}\.\w{2,6}\.\w{2,6}$/
                   if(regs.test(value)){
                      callback();
                   }else{
                       callback(new Error('请输入www.xxx.xxx格式网址'));
                   }
               }
           }
           return {
                fileList: [{}],
                dialogFormVisible: false,
                dialogFormnewSeat:false,
                dialogFormsetmeal:false,
                cinemadialog:false,
                amengdingdialog:false,
                visible2: false,
                goodsdialog:false,
                formLabelWidth: '180px',
                formLabelleft: '180px',
                widths:'30%',
                currentPage2: 5,
                input5: '',
                select: '',
                activeNames: ['1'],
                ok:false,
                arr:[],
                changeSeat:[],
                amendinng:[],
                row:[],
                idlist:[],
                cinemaNew:{
                  domains: [{
                    value: '',
                    seat:'',
                    newSeat:''
                  }]
                } ,
                options:[{
                   select:'院线名',
                   label:'院线名'
                },{
                   select:'地址',
                   label:'地址'
                }],
                setMeal: {
                    img: '',
                    text:'',
                    content:'',
                    priceRed:'',
                    priceAll:'',
                    outprit:''
                },
                form: {
                    name: '',
                    address: '',
                    phone: '',
                    network: ''
                },
                newSeatss:{
                   cinemaName:'',
                   address:'',
                   tel:'',
                   webAdress:'',
                   id:''
               },
                niceNewSeat:{
                   seat:[{
                       checkSeat:''
                   }]
               },
               multipleSelection:[],
                rules1:{
                   cinemaName:[{
                       validator:changeCinema,trigger:'blur'
                   }],
                   address:[{
                       validator:changeAddress,trigger:'blur'
                   }],
                   tel:[{
                       validator:changeHotline,trigger:'blur'
                   }],
                   webAdress:[{
                       validator:changeWeb,trigger:'blur'
                   }]
                },
                rules2:{
                   name:[{
                       validator:addCinema,trigger:'blur'
                   }],
                   address:[{
                       validator:addAddress,trigger:'blur'
                   }],
                   phone:[{
                       validator:addHotline,trigger:'blur'
                   }],
                   network:[{
                       validator:addWeb,trigger:'blur'
                   }]
               },
                dynamicValidateForm: {
                  domains: [{
                    
                  }]
                },
               
            }
            
        },
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
                
              },
            handlePreview(file) {
                console.log(file);
            },
            addGoodsImg(file,fileList){
                this.fileList.push(fileList)
                console.log(fileList)
            },
            //单行点击删除取消
            noclear(i){
                i.visible2 = false
                dispatch({
                    type:ACTIONS_CINEMES
                })
            },
           //取消修改
            clear(){
                this.dialogFormnewSeat = false
                dispatch({
                        type:ACTIONS_CINEMES
                    })
            },
            //搜索
            search: function(){
                    switch(this.select){
                        case '院线名':
                            
                            dispatch({
                                type:ACTIONS_LINESEARCH,
                                cinemaName:this.input5,
                                page:cinemas.curpage,
                                rows:cinemas.eachpage
                            })
                        break;
                        case '地址':
                            dispatch({
                                type:ACTIONS_ADDRESSSEARCH,
                                address:this.input5,
                                page:cinemas.curpage,
                                rows:cinemas.eachpage
                            })
                        break;
                        default:
                            return false
                    }
                    
            },
            //增加影院预览
            change(i){
                let box=document.getElementsByClassName('box')
                if(this.cinemaNew.domains[i].seat){
                    if(flag){
                        event.target.innerHTML='预览'  
                        box[i].style.display='none'
                        flag=false
                    }else{
                        event.target.innerHTML='隐藏'  
                        box[i].style.display='block'
                        flag=true
                    }
                    this.arr=JSON.parse(this.cinemaNew.domains[i].seat)
                    this.cinemaNew.domains[i].newSeat=JSON.parse(this.cinemaNew.domains[i].seat)
                }else{
                     this.$message({
                        message:'请在座位里输入二位数组！',
                        type:'error',
                        duration:1500
                    })
                }
            },
            //添加影厅时的删除影厅
            removeDomain(item) {
                var index = this.cinemaNew.domains.indexOf(item)
                if (index !== -1) {
                    this.cinemaNew.domains.splice(index, 1)
                }
            },
            //取消添加影院
            abolish(formName){
                this.dialogFormVisible=false
                this.$refs[formName].resetFields();
                let seatLong=this.cinemaNew.domains.length
                let box=document.getElementsByClassName('box')
                for(let i=0;i<seatLong;i++){
                    this.cinemaNew.domains[i].value='';
                    this.cinemaNew.domains[i].seat=''
                    box[i].style.display='none'
                }
                 this.cinemaNew.domains.length=1
                 
            },
            //提交增加院线
           submitForm(formName,k){
               
                this.$refs[formName].validate((valid)=>{
                     if(valid){
                       
                        if(this.cinemaNew.domains.length>=1){
                            dispatch({
                                type:ACTIONS_SEAT,
                                projName:this.cinemaNew.domains,
                                longs:this.cinemaNew.domains.length,
                                cinemaName:this.form.name,
                                address:this.form.address,
                                tel:this.form.phone,
                                webAdress:this.form.network
                            })
                             let alongs=this.cinemaNew.domains.length;
                             let box=document.getElementsByClassName('box')
                             let falgs=0;
                              var screen=this.cinemaNew.domains  
                                 for(let i=0;i<alongs;i++){
//                                     console.log(i)
                                    if(falgs==alongs-1){
                                        this.dialogFormVisible = false
                                        this.$message({
                                            message:'添加成功',
                                            type:'success',
                                            duration:2000
                                        })
                                        this.form.name=''
                                        this.form.address=''
                                        this.form.phone=''
                                        this.form.network=''

                                    }
                                    falgs++
                                    //延时清空座位数据
                                    (function(i) {  
                                        setTimeout(function() { 
                                            screen[0].value='',
                                            screen[0].seat=''
                                            screen[0].newSeat=''
                                            screen.length=1
                                            box[0].style.display='none'
                                        }, 1000);  
                                    })(i)  
                                    
                                }
                          }else{
                               this.$message({
                                    message:'请至少添加一个影厅！',
                                    type:'error',
                                    duration:1500
                                })
                          }
                    }else{
                        return false 
                    }
                })
            },
            //分页
            changepage(val){
                dispatch({
                    type:ACTIONS_CINEMES,
                     page:`${val}`,
                     rows:cinemas.eachpage
                })
            },
            //删除数据
            deleteRow(index, rows) {
                //删除每条信息
                dispatch({
                    type:ACTIONS_SETDELETE,
                    id:rows[index]._id
                })
               //删除座位信息
                dispatch({
                    type:ACTIONS_DELETE,
                    long:rows[index].projection.length,
                    id:rows[index].projection
                })
                //刷新界面
                     dispatch({
                        type:ACTIONS_CINEMES
                    })
                 this.$message({
                    message:'删除成功',
                    type:'success',
                     duration:1500
                })
            },
            //多选获取数据id集合
            changeFun(val) {
              this.multipleSelection = val;
                
                
                console.log(this.multipleSelection)
                
                
            },
            //多选删除
            deletes(){
                console.log( this.multipleSelection)
                if(this.multipleSelection.length!=0){
                    for(let ele of this.multipleSelection){
                        array.push(ele._id)
                    }
                    for(let i=0;i<this.multipleSelection.length;i++){
                         for(let j=0;j<this.multipleSelection[i].projection.length;j++){
                            this.idlist.push(this.multipleSelection[i].projection[j])
                        }
                     }
                     var msg=axios.get('http://127.0.0.1:3000/cinemas/del',{
                        params:{
                            ids:array
                        }
                    })
                    console.log(this.idlist)
                    dispatch({
                        type:ACTIONS_IDLIST,
                        longs:this.idlist.length,
                        id:this.idlist
                    })
                    dispatch({
                        type:ACTIONS_CINEMES
                    })
                    array=[]
                     this.$message({
                        message:'删除成功！',
                        type:'success',
                        duration:1500
                    })
                 }else{
                      this.$message({
                            message:'请选择你要删除的数据！',
                            type:'error',
                            duration:1500
                        })
                 }  
            },
            //分页中选中的条数
            handleSizeChange(val){
                 console.log(val)
                 cinemas.eachpage=val
                 dispatch({
                    type:ACTIONS_CINEMES
                 })
            },
            //动态添加影厅数量
            addDomain() {
                this.cinemaNew.domains.push({
                  value: '',
                  key: Date.now()
                });
              },
            //单选获取数据
            setCurrent(val) {
                this.$refs.multip.toggleRowSelection(val)
                this.newSeatss.cinemaName=val.cinemaName;
                this.newSeatss.address=val.address;
                this.newSeatss.tel=val.tel;
                this.newSeatss.webAdress=val.webAdress;
                this.newSeatss.id=val._id;
              },
            //修改院线的弹框
            async checkCinema(row){
                console.log(row)
                this.row=row.projection
                if(row._id){
                    this.dialogFormnewSeat=true;
                    console.log(this.amendinng)
                    let msg=await axios.get('http://127.0.0.1:3000/cinemas/find',{
                        params:{
                          _id:row._id
                        }
                    })
                    let projection=msg.data.projection
                    let niceArr=[];
                    for(let i=0;i<projection.length;i++){
                        let data=await axios.get('http://127.0.0.1:3000/projection/find',{
                            params:{
                                _id:projection[i]
                            }
                        })
                        data.data.seats=JSON.stringify(data.data.seats)
                        niceArr.push(data.data)
                    }
                    this.changeSeat=niceArr;
                }else{
                    this.$message({
                        message:'请选择你要修改的数据！',
                        type:'error',
                        duration:1500
                    })
                }
            },
            //添加观影套餐弹框
            showbounced(){
                console.log(this.multipleSelection)
//                if(this.newSeatss.id){
                   if(this.multipleSelection.length==1){
                    this.goodsdialog=true
                }else{
                     this.$message({
                        message:'请选择你要添加的影院！',
                        type:'error',
                        duration:1500
                    })
                }
            },
            //添加观影套餐
            addGoods(){
                    dispatch({
                        type:ACTIONS_MOVIESET,
                        id:this.newSeatss.id,
                        text:this.setMeal.text,
                        content:this.setMeal.content,
                        priceRed:this.setMeal.priceRed,
                        priceAll:this.setMeal.priceAll,
                        outprit:this.setMeal.outprit
                    })
                    this.$message({
                        message:'添加成功！',
                        type:'success',
                        duration:2000
                    }) 
                    this.goodsdialog=false
                    this.setMeal.text=''
                    this.setMeal.content=''
                    this.setMeal.priceRed=''
                    this.setMeal.priceAll=''
                    this.setMeal.outprit=''
                    dispatch({
                        type:ACTIONS_CINEMES
                    })
            },
            //取消添加观影套餐
            cancel(){
                this.goodsdialog=false
                this.setMeal.text=''
                this.setMeal.content=''
                this.setMeal.priceRed=''
                this.setMeal.priceAll=''
                this.setMeal.outprit=''
                dispatch({
                        type:ACTIONS_CINEMES
                    })
            },
            //确认修改影院
            changeCinema(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                            //更新影院信息    
                            dispatch({
                                type:ACTIONS_CHANGEMOVIE,
                                id:this.newSeatss.id,
                                cinemaName:this.newSeatss.cinemaName,
                                address:this.newSeatss.address,
                                tel:this.newSeatss.tel,
                                webAdress:this.newSeatss.webAdress
                            })
                            //修改影院信息
                            dispatch({
                                type:ACTIONS_PROJECTION,
                                seatLongs:this.row.length,
                                content:this.changeSeat,
                                id:this.row
                            })
                            //刷新
                            dispatch({
                                type:ACTIONS_CINEMES
                            })
                            this.$message({
                                message:'修改成功！',
                                type:'success',
                                duration:2000
                            }) 
                            this.newSeatss.id=''
                            this.dialogFormnewSeat = false
                      }else{
                          return false 
                       }
                })
            },
            online(i){
                if(this.changeSeat[i].seats){
                    this.amengdingdialog=true;
                    console.log(this.changeSeat[i].seats)
                    this.amendinng=JSON.parse(this.changeSeat[i].seats)
                }else{
                    this.$message({
                        message:'请在座位里输入二位数组！',
                        type:'error',
                        duration:1500
                    })
                }
            }
                   
        },
       //表格初始化
        created(){
            dispatch=this.$store.dispatch;
            cinemas=this.$store.state.cinemas;
            dispatch({
                type:ACTIONS_CINEMES,
                page:cinemas.curpage,
                rows:cinemas.eachpage
            })
        },
        computed:{
            rows(){
                return cinemas.cinema
            },
            newSeats(){
                return cinemas.newSeat
            }
        }
    }

</script>
<style scoped>
    .block{
        text-align: center
    }
    .header{
        text-align: center
    }  
    .seat{
        border:1px solid #ccc
    }
    .box{
        display: none;
        width:300px;
    }
     .boxs{
/*        display: none;*/
        width:300px;
    }
    img{
        display: inline-block;
        width:20px;
        height:20px;
        
    }
    .red{
         display: inline-block;
        width:20px;
        height:20px;
        background-color: red;
    }
    .green{
        display: inline-block;
         width:20px;
        height:20px;
        background-color: green;
    }
    .position{
        position: absolute;
        top:50px;
        right:160px;
    }
    .formitem{
        position: relative;
    }
    .left{
       position: absolute;
        top:0px;
        right:180px;
    }
    .right{
        position: relative;
    }
    .delete{
        position: absolute;
        top:0px;
        right:160px;
    }
    img{
        margin-right: 6px;
    }
    .el-select .el-input {
        width: 110px;
    }
    .padd{
        padding-right:40px
    }
    .deletes{
         position: absolute;
        top:0px;
        right:180px;
    }
</style>