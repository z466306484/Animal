<template>
  <div class="container" v-if="showpage"  :style="'min-height:'+ mincht">
    <leftnav></leftnav>
    <div class="rightbox">
      <div class="topbox">
        <topnav></topnav>
      </div>
      <!--首页内容-->
      <div class="content">
        <div class="listbox">
          <div class="listbox_title">
            禁用列表
          </div>
          <div class="listbox_do">
            <div class="addbox">
              <p class="shownum">合计：<span>{{numcount}}</span>人</p>
            </div>
            <div class="list_inputs">
              <!--选择框-->
              <el-select size="small" clearable v-model="selectvalue" placeholder="请选择">
                <el-option
                  v-for="item in selectData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <!--输入框-->
              <el-input size="small" clearable class="topinput" v-model="topInput" placeholder="输入关键字查找"></el-input>
              <!--按钮-->
              <el-button size="small" type="primary" @click="finduserdiasable">查找</el-button>
            </div>
          </div>
          <div class="martial_table" >
            <recovertable :tableobj="tableobj" @todetai="todetai"></recovertable>
          </div>
          <!--分页-->
          <div style="margin-top: 30px;display: flex;align-items: center;" v-if="pageobj!=''">
            <pagesnav @clickpage="clickpage" :pageobj="pageobj" :tabliearr="tableobj.allarr"></pagesnav>
          </div>
        </div>
      </div>
    </div>
    <popup  :alertobj="alertobj" @alterdetai="alterdetai($event)"></popup>
  </div>
</template>

<script>
  import topnav from '@/components/sannav/top'
  import leftnav from  '@/components/sannav/left'
  import recovertable from '@/components/santable/santable5'
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
          pagenum:15,
          nowindex:1,
        },
        selectData: [
          {
            value: '1',
            label: '用户名'
          },{
            value: '2',
            label: '手机号码'
          },{
            value: '3',
            label: '单位'
          },{
            value: '4',
            label: '职业'
          },{
            value: '5',
            label: '所在城市'
          }],
        topInput:'',
        selectvalue:'',
        //表格数据
        tableobj:{
          tharr:[{width:'17%',val:'用户名'},{width:'8%',val:'性别'},{width:'10%',val:'手机号码'},{width:'10%',val:'单位'},{width:'13%',val:'职业'},{width:'10%',val:'所在城市'},{width:'17%',val:'加入时间'},{width:'15%',val:'操作'}],
          tabliearr:[],
          allarr:[],
          roleeditshow:true,
          title:'user'
        },
        //禁用弹框参数
        alertobj:{
          delalert:false,
          alertitle:'恢复提示',
          content:'确定要恢复这个用户为正常吗？',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        // 禁用列表id
        deleteid:'',
        queobj:{},
        numcount:'',
        mincht:'',
        rolebox:''
      }
    },
    props: {},
    methods: {
      clickpage(index){
        let _this = this
        _this.pageobj = _cloneDeep({
          pagenum:15,
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
        if(obj.type==0){  //点击查看的方法
          this.$router.push({path:'/san_user_show?type=2&&id='+obj.item.id})
        }
        if(obj.type==3){//点击编辑的方法
          this.deleteid=obj.item.id //存储禁用id
          this.alertobj.delalert=true  //  显示弹出框
        }
      },
      // 点击弹框确定huifu方法
      alterdetai(obj){
        let _this=this
        //点击弹框确定
        if(obj.type==0){
          this.alertobj.delalert=false
          //  发请求
          this.axios.post(this.apis+'/san/User/ajax_recovery', {
            id:this.deleteid,
          }).then((res) => {
            if(res.data.code==10000){
              this.$message({
                duration:1000,
                center: true,
                message: '已恢复',
                type: 'success'
              });
              setTimeout(()=>{
                _this.initdata()
              },1000)
            }else{
              this.$message({
                duration:1000,
                center: true,
                message: res.data.msg,
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
      finduserdiasable(){
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
        this.roleshow()
        this.axios.post(this.apis+'/san/User/ajax_searchrecy', {
          search:this.topInput,
          state:this.selectvalue
        }).then((res) => {
          if(res.data.code==10000){
            this.tableobj.allarr=[]
            /*this.topInput=''
            this.selectvalue=''*/
            for(var i=0;i<res.data.data.length;i++){
              let my={}
              my.id=res.data.data[i].id
              my.img=res.data.data[i].photos
              my.name=res.data.data[i].nickname
              my.yunum=res.data.data[i].user_sex
              my.phnum=res.data.data[i].user_phone
              my.joinnum=res.data.data[i].user_company
              my.time=res.data.data[i].user_occupation
              my.time1=res.data.data[i].user_city
              my.time2=res.data.data[i].ctime
              my.btnarr=[{type:0,val:'查看'},{type:3,val:'恢复'}]
              this.tableobj.allarr.push(my)
            }
            this.clickpage(1)
          }
        })
          .catch(function (err) {
          })
      },
      initdata(){
        let _this=this
        this.axios.post(this.apis+"/san/User/ajax_show1")
          .then((res)=> {
            console.log("hahha")
            console.log(res.data)
           if(res.data.code==10000){
             _this.tableobj.allarr=[]
             _this.numcount=res.data.data.length
             for(var i=0;i<res.data.data.length;i++){
               let my={}
               my.id=res.data.data[i].id
               my.img=res.data.data[i].photos
               my.name=res.data.data[i].nickname
               my.yunum=res.data.data[i].user_sex
               my.phnum=res.data.data[i].user_phone
               my.joinnum=res.data.data[i].user_company
               my.time=res.data.data[i].user_occupation
               my.time1=res.data.data[i].user_city
               my.time2=res.data.data[i].ctime
               my.btnarr=[{type:0,val:'查看'},{type:3,val:'恢复'}]
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
      },
      roleshow(){
        let _this=this
        this.axios.post(this.apis+'/san/Login/get_user').then((res) => {
          if(res.data.code==10000){
            console.log(res.data.data)
            if(res.data.data){
              _this.rolebox=res.data.data.rule_id
            }
            for(var i=0;i<_this.rolebox.length;i++){
              if(_this.rolebox[i].id==8){
                _this.tableobj.roleeditshow=false
              }
            }
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
      document.title = '禁用列表'
      this.roleshow()
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
      height: 100%;
      max-height: 100%;
      margin-left: 200px;
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
            margin-top: 30px;
            min-height: 30px;
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
</style>
