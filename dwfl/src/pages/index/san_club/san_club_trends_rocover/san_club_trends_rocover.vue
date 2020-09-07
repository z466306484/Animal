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
            动态回收站
          </div>
          <div class="listbox_do">
            <div class="addbox">
              <p class="shownum">合计：<span>{{numcount}}</span>条动态</p>
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
              <el-button size="small" type="primary" @click="findclubtrendsre">查找</el-button>
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
    <popup  :alertobj="realertobj" @alterdetai="alterredetai($event)"></popup>
  </div>
</template>

<script>
  import topnav from '@/components/sannav/top'
  import leftnav from  '@/components/sannav/left'
  import recovertable from '@/components/santable/santable4'
  import pagesnav from '@/components/sanpages/pages'
  import popup from '@/components/sanpopup/sanpopup'
  import _cloneDeep from 'lodash/cloneDeep'
  import bus from '@/assets/evnetBus'
  export default {
    components: {leftnav,topnav,recovertable,pagesnav,popup},
    data() {
      return {
        mincht:'',
        showpage:false,
        pageobj:{
          pagenum:5,
          nowindex:1,
        },
        selectData: [
          {
            value: '1',
            label: '动态内容'
          }, {
            value: '2',
            label: '发布人'
          }],
        topInput:'',
        selectvalue:'',
        //表格数据
        tableobj:{
          tharr:[{width:'10%',val:'id'},{width:'15%',val:'发布人'},{width:'30%',val:'动态内容'},{width:'15%',val:'留言数'},{width:'15%',val:'发布时间'},{width:'15%',val:'操作'}],
          tabliearr:[],
          allarr:[]
        },
        //恢复弹框参数
        realertobj:{
          delalert:false,
          alertitle:'恢复提示',
          content:'确定要恢复这条动态吗？',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        //删除弹框参数
        alertobj:{
          delalert:false,
          alertitle:'删除提示',
          content:'确定要彻底删除这条动态吗？',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        // 删除列表id
        deleteid:'',
        rebackid:'',
        detailsobj:{},
        numcount:''
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
        if(obj.type==0){  //点击查看的方法
          this.$router.push({path:'/san_club_trends_show?type=2&&id='+obj.item.id})
         }
        if(obj.type==2){//点击编辑的方法
          this.rebackid=obj.item.id //存储恢复id
          this.realertobj.delalert=true  //  显示弹出框
        }
        if(obj.type==3){//点击删除的方法
          this.deleteid=obj.item.id //存储删除id
          this.alertobj.delalert=true  //  显示弹出框
        }
      },
      // 点击弹框确定删除方法
      alterdetai(obj){
        //点击弹框确定
        let _this=this
        if(obj.type==0){
          this.alertobj.delalert=false
          //  发请求
          this.axios.post(this.apis+'/san/dynamic/delete', {
            id:this.deleteid,
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
      //点击弹框确定恢复方法
      alterredetai(obj){
        //点击弹框确定
        let _this=this
        if(obj.type==0){
          this.realertobj.delalert=false
          //  发请求
          this.axios.post(this.apis+'/san/dynamic/save', {
            id:this.rebackid,
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
            }
          })
            .catch(function (err) {
            })
        }
        //点击弹框取消
        if(obj.type==2){
          this.realertobj.delalert=false
        }
      },
      // 查找方法
      findclubtrendsre(){
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
        this.axios.post(this.apis+'/san/Dynamic/hsearch', {
          key:this.selectvalue,
          content:this.topInput,
        }).then((res) => {
          var trendsdata=res.data.data
          var mylenth=res.data.data.length
          this.tableobj.allarr=[]
          for(var i=0;i<mylenth;i++){
            let my={}
            my.id=trendsdata[i].dynamic_id
            my.name=trendsdata[i].nickname
            my.index=i+1
            my.img=trendsdata[i].photos
            my.content=trendsdata[i].content
            my.pics=trendsdata[i].picture
            my.video=trendsdata[i].video
            my.yunum=trendsdata[i].pl
            my.phnum=trendsdata[i].ctime
            my.btnarr=[{type:0,val:'详情'},{type:2,val:'恢复'},{type:3,val:'删除'}]
            this.tableobj.allarr.push(my)
          }
          this.clickpage(1)
        })
          .catch(function (err) {
          })
      },
      initdata(){
        let _this=this
        this.axios.post(this.apis+"/san/dynamic/hindex")
          .then((res)=> {
            if(res.data.code==10000){
              var trendsdata=res.data.data.data
              var mylenth=res.data.data.data.length
              _this.numcount=res.data.data.data.length
              _this.tableobj.allarr=[]
              for(var i=0;i<mylenth;i++){
                let my={}
                my.id=trendsdata[i].dynamic_id
                my.name=trendsdata[i].nickname
                my.index=i+1
                my.img=trendsdata[i].photos
                my.content=trendsdata[i].content
                my.pics=trendsdata[i].picture
                my.video=trendsdata[i].video
                my.yunum=trendsdata[i].pl
                my.phnum=trendsdata[i].ctime
                my.btnarr=[{type:0,val:'详情'},{type:2,val:'恢复'},{type:3,val:'删除'}]
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
    },
    mounted(){
      this.mincht = (this.docheight )  +'px'
    },
    created() {
      document.title = '动态回收站'
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
      margin-left: 200px;
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
            margin-top: 30px;
            margin-bottom: 30px;
            min-height: 30px;
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
