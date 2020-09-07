<template>
  <div class="container" v-if="showpage" :style="'min-height:'+ mincht">
    <leftnav></leftnav>
    <div class="rightbox">
      <div class="topbox">
        <topnav></topnav>
      </div>
      <!--首页内容-->
      <div class="content">
        <div class="listbox">
          <div class="listbox_title">
            评论列表  <router-link to="/san_material_answer_recover"><span class="return_list" >回收站</span></router-link>
          </div>
          <div class="listbox_do">
            <div class="addbox">
              <p class="shownum">合计评论<span>{{numcount}}</span>条</p>
            </div>
            <div class="list_inputs">
              <!--选择框-->
              <el-select  size="small" clearable v-model="selectvalue" placeholder="请选择搜索类型">
                <el-option
                  v-for="item in selectData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <!--输入框-->
              <el-input   size="small" clearable class="topinput" v-model="topInput" placeholder="输入关键字查找"></el-input>
              <!--按钮-->
              <el-button size="small " type="primary" @click="findmaterialanswer">查找</el-button>
            </div>
          </div>
          <div class="martial_table" >
            <recovertable :tableobj="tableobj" @todetai="todetai"></recovertable>
          </div>
          <div style="margin-top: 30px;display: flex;align-items: center;" v-if="pageobj!=''">
            <pagesnav @clickpage="clickpage" :pageobj="pageobj" :tabliearr="tableobj.allarr"></pagesnav>
          </div>
        </div>
      </div>
    </div>
    <!--删除弹框-->
    <popup  :alertobj="alertobj" @alterdetai="alterdetai($event)"></popup>
    <!--回复弹框-->
    <div class="alertimg" v-if="answeralertobj.answeralert">
      <div class="delalert" >
        <div class="deltitle">
          <div>{{answeralertobj.alertitle}}</div>
          <div  style="cursor: pointer" @click="answeralertobj.answeralert = false">×</div>
        </div>
        <div style="padding: 15px 10px;text-align: center;">
          <el-input  type="textarea" v-model="answeralertobj.content" placeholder="请填写您要回复的内容"></el-input>
        </div>
        <div class="delbtn" style="display: flex;padding: 20px 20px;flex-direction: row-reverse">
          <div class="surebtn"@click="submitanwser()" >确定</div>
          <div class="calbtn" @click="answeralertobj.answeralert = false">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import topnav from '@/components/sannav/top'
  import leftnav from  '@/components/sannav/left'
  import recovertable from '@/components/santable/santable3'
  import pagesnav from '@/components/sanpages/pages'
  import popup from '@/components/sanpopup/sanpopup'
  import _cloneDeep from 'lodash/cloneDeep'
  import bus from '@/assets/evnetBus'
  export default {
    components: {leftnav,topnav,recovertable,pagesnav,popup},
    data() {
      return {
        showpage:false,
        pageobj:{
          pagenum:5,
          nowindex:1,
        },
        selectData: [
          {
            value: '1',
            label: '评论人'
          }, {
            value: '2',
            label: '评论内容'
          }, {
            value: '3',
            label: '被评论资料'
          }],
        topInput:'',
        selectvalue:'',
        // 表格数据
        tableobj:{
          tharr:[{width:'5%',val:'id'},{width:'20%',val:'评论人'},{width:'15%',val:'被评论资料'},{width:'15%',val:'评论内容'},{width:'10%',val:'获赞'},{width:'15%',val:'评论时间'},{width:'20%',val:'操作'}],
          tabliearr:[ ],
          allarr:[]
        },
        //  删除弹框参数
        alertobj:{
          delalert:false,
          alertitle:'删除提示',
          content:'确定要删除这个评论吗？',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        //回复弹框参数
        answeralertobj:{
          answeralert:false,
          alertitle:'回复操作',
          content:'',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        // 删除列表id
        deleteid:'',
        // 回复列表id
        answerid:'',
        queobj:{},
        numcount:'',
        mincht:'',
        retype:0,
      }
    },
    props: {},
    methods: {
      clickpage(index){
        let _this = this
        _this.pageobj = _cloneDeep({
          pagenum:5,
          nowindex:index,
        })
        var objdata = _this.tableobj.allarr
        var nowarr = []
        if(objdata.length>_this.pageobj.pagenum*index){
          for(let i =(index-1)*_this.pageobj.pagenum;i<_this.pageobj.pagenum*index;i++){
            nowarr.push(objdata[i])
          }
        }else {
          for(let i =(index-1)*_this.pageobj.pagenum;i<objdata.length;i++){
            nowarr.push(objdata[i])
          }
        }
        _this.tableobj.tabliearr = _cloneDeep(nowarr)
        bus.$emit('checknav',{
          nowindex:index,
          tabarr:_this.tableobj.allarr,
        });
      },
      // 表格按钮点击方法
      todetai(obj){
        if(obj.type==0){  //点击回复的方法
          this.answeralertobj.answeralert=true
          this.answeralertobj.content=obj.item.acontent
          this.answerid=obj.item.id
        }
        if(obj.type==2){//点击编辑的方法
          this.$router.push({path:'/san_material_answer_show?type=1&&id='+obj.item.id})
        }
        if(obj.type==3){//点击删除的方法
          this.deleteid=obj.item.id //存储删除id
          this.alertobj.delalert=true  //  显示弹出框
        }
      },
      // 点击删除弹框方法
      alterdetai(obj){
        //点击弹框确定
        if(obj.type==0){
          this.alertobj.delalert=false
          let _this=this
          this.axios.post(this.apis+'/san/Material/reply_del',{
            comment_id:this.deleteid,
          }).then((res) => {
            if(res.data.code==10000){
              this.$message({
                duration:1000,
                center: true,
                message: '已删除',
                type: 'success'
              });
              setTimeout(()=>{
                _this.initdata()
              },1000)
            }else{
              this.$message({
                duration:1000,
                center: true,
                message:res.data.msg,
                type: 'error'
              });
            }
          })
            .catch(function (err) {
            })
        }
        //点击弹框取消
        if(obj.type==2){
          this.alertobj.delalert=false
        }
      },
      // 查找方法
      findmaterialanswer(){
        // 发起请求
        if(this.topInput!=''&&this.selectvalue==''){
          this.$message({
            duration:1000,
            center: true,
            message: '请选择搜索类型',
            type: 'error'
          });
          return false
        }
        this.axios.post(this.apis+'/san/Material/reply_search', {
          key:this.selectvalue,
          search:this.topInput,
          status:1
        }).then((res) => {
          this.tableobj.allarr=[]
          for(var i=0;i<res.data.data.length;i++){
            let my={}
            my.id=res.data.data[i].comment_id
            my.img=res.data.data[i].photos
            my.index=i+1
            my.acontent=res.data.data[i].acontent
            my.answer=[{answer1:res.data.data[i].user_name,answer2:res.data.data[i].user_occupation,answer3:res.data.data[i].user_company}]
            my.yunum=res.data.data[i].name
            my.phnum=res.data.data[i].ucontent
            my.joinnum=res.data.data[i].dz
            my.time1=res.data.data[i].ctime
            my.btnarr=[{type:0,val:'回复'},{type:2,val:'详情'},{type:3,val:'删除'}]
            this.tableobj.allarr.push(my)
          }
          this.clickpage(1)
        })
          .catch(function (err) {
          })
      },
      //弹框点击确认回复
      submitanwser(){
        let _this=this
        //  发请求
        console.log(this.answeralertobj.content)
        if(this.answeralertobj.content==''||this.answeralertobj.content==undefined){
          this.initdata()
          this.$message({
            duration:1000,
            center: true,
            message: '回复内容不能为空',
            type: 'error'
          });
          return false
        }
        this.answeralertobj.answeralert=false
        if(_this.retype==1){
          return false;
        }
        _this.retype=1;
        this.axios.post(this.apis+'/san/Material/reply',{
          comment_id:this.answerid,
          acontent:this.answeralertobj.content
        }).then((res) => {
          if(res.data.code==10000){
            this.$message({
              duration:1000,
              center: true,
              message: '已回复',
              type: 'success'
            });
            _this.retype=0;
          }else{
            this.$message({
              duration:1000,
              center: true,
              message: res.msg,
              type: 'error'
            });
            _this.retype=0;
          }
        })
          .catch(function (err) {
          })
      },
      initdata(){
        let _this =  this
        this.axios.post(this.apis+"/san/Material/comment", {
          status:1,
        })
          .then((res)=> {
            if(res.data.code==10000){
              _this.tableobj.allarr=[]
              _this.numcount=res.data.data.length
              for(var i=0;i<res.data.data.length;i++){
                let my={}
                my.id=res.data.data[i].comment_id
                my.img=res.data.data[i].photos
                my.index=i+1
                my.answer=[{answer1:res.data.data[i].user_name,answer2:res.data.data[i].user_occupation,answer3:res.data.data[i].user_company}]
                my.yunum=res.data.data[i].name
                my.acontent=res.data.data[i].acontent
                my.phnum=res.data.data[i].ucontent
                my.joinnum=res.data.data[i].dz
                my.time1=res.data.data[i].ctime
                my.btnarr=[{type:0,val:'回复'},{type:2,val:'详情'},{type:3,val:'删除'}]
                _this.tableobj.allarr.push(my)
              }
              _this.clickpage(1)
              _this.showpage = true
            }
            if(res.data.code==10008){
              _this.$router.push({path:'/san_login'})
            }

          })
          .catch(function (err) {
          })
      }
    },
    mounted(){
      this.mincht = (this.docheight )  +'px'
    },
    created() {
    document.title = '资料评论'
    this.initdata()
    },
  }
</script>

<style scoped lang="less">
  .container{
    display: flex;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .rightbox{
      width: 87%;
      margin-left: 200px;
      height: 100%;
      max-height: 100%;
      display: flex;
      flex-direction: column;
      .topbox{
        width: 100%;
        height: 71px;
      }
      .content{
        flex: 1;
        overflow-y: auto;
        width: 100%;
        background-color: #f2f2f2;
        .listbox{
          width: 97%;
          margin-top: 20px;
          margin-bottom: 30px;
          margin-left: 1.5%;
          min-height: 500px;
          background-color: white;
          .martial_table{
            width: 95.5%;
            margin-left: 2.5%;
            min-height: 300px;
          }
          .listbox_title{
            padding: 15px 0px 15px 30px;
            font-size: 12px;
            border-bottom: 1px solid #e4e4e4;
          }
          .listbox_do{
            /*display: flex;*/
            min-height: 30px;
            margin-top: 30px;
            margin-bottom: 30px;
            .list_inputs{
              width:auto;
              float: right;
              margin-right: 2%;
              .topinput{
                width: auto;
              }
            }
            .addbox{
              width: 30%;
              float: left;
              margin-left:2.5%;
              .shownum{
                font-size: 14px;
                color: #333333;
              }
            }
          }
        }
      }
    }
  }
  .sortEdit>.imgdiv{
    display: flex;
  }
  .alertimg{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 101;
    background-color: rgba(0,0,0,0.5);
    overflow-x: hidden;
    overflow-y: hidden;
    display:flex;justify-content:center;align-items:center;
  }
  .delalert{
    background-color:#fff;
    width:25%;
    font-size: 12px;
    min-height:160px;
    border: 1px solid #e2e2e2;
  }
  .deltitle{
    padding: 10px 20px 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    background-color: #f8f8f8;
  }
  .surebtn{
    background-color: rgb(240, 240, 240);
    color: #6c6c6c;
    padding: 7px 15px;
    margin-left: 10px;
    cursor: pointer;
    border-radius: 3px;
  }
  .calbtn{
    background-color: rgb(46, 141, 237);
    padding: 7px 15px;
    color: white;
    cursor: pointer;
    border-radius: 3px;
  }
 .return_list{
   margin-left:85%;
   cursor: pointer;
   text-decoration:none;
   color: #666666;
   display: inline-block;
  }
</style>
