<template>
  <div class="container"  v-if="showpage" :style="'min-height:'+ mincht">
    <leftnav></leftnav>
    <div class="rightbox">
      <div class="topbox">
        <topnav></topnav>
      </div>
      <!--首页内容-->
      <div class="content">
        <div class="listbox">
          <div class="listbox_title">
            广告回收站
          </div>
          <div class="listbox_do">
            <div class="addbox">
              <p class="shownum">合计：<span>{{numcount}}</span>条</p>
            </div>
            <div class="list_inputs">
              <!--输入框-->
              <el-input size="small" clearable class="topinput" v-model="topInput" placeholder="输入广告名称"></el-input>
              <!--按钮-->
              <el-button size="small" type="primary" @click="findadvertre">查找</el-button>
            </div>
          </div>
          <div class="martial_table">
            <mterialtable :tableobj="tableobj" @todetai="todetai"></mterialtable>
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
  import mterialtable from '@/components/santable/santable6'
  import pagesnav from '@/components/sanpages/pages'
  import popup from '@/components/sanpopup/sanpopup'
  import _cloneDeep from 'lodash/cloneDeep'
  import bus from '@/assets/evnetBus'
  export default {
    components: {leftnav,topnav,mterialtable,pagesnav,popup},
    data() {
      return {
        mincht:'',
        showpage:false,
        pageobj:{
          pagenum:15,
          nowindex:1,
        },
        //顶部搜索框
        topInput:'',
        //表格传递参数
        tableobj:{
          tharr:[{width:'10%',val:'序号'},{width:'25%',val:'广告标题'},{width:'10%',val:'位置'},{width:'10%',val:'状态'},{width:'20%',val:'发布时间'},{width:'15%',val:'操作'}],
          tabliearr:[],
          allarr:[]
        },
        //恢复弹框参数
        realertobj:{
          delalert:false,
          alertitle:'恢复提示',
          content:'确定要恢复这个广告吗？',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        //删除弹框参数
        alertobj:{
          delalert:false,
          alertitle:'删除提示',
          content:'确定要彻底删除这个广告吗？',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        // 删除列表id
        deleteid:'',
        rebackid:'',
        delstatus:'',
        numcount:''
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
          this.$router.push({path:'/san_recover_show?id='+obj.item.id})
        }
        if(obj.type==2){//点击编辑的方法
          this.rebackid=obj.item.id //存储恢复id
          this.realertobj.delalert=true  //  显示弹出框
        }
        if(obj.type==3){//点击删除的方法
          this.deleteid=obj.item.id//存储删除id
          this.delstatus=obj.item.show //存储删除
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
          this.axios.post(this.apis+'/san/Advertisement/ajax_dels', {
            ad_id:this.deleteid,
            status:this.delstatus
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
        if(obj.type==0){
          this.realertobj.delalert=false
          //  发请求
          let _this=this
          this.axios.post(this.apis+'/san/Advertisement/ajax_recovery', {
            ad_id:this.rebackid
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
      findadvertre(){
        // 发起请求
        this.axios.post(this.apis+'/san/Advertisement/ajax_searchrecy', {
          name:this.topInput,
        }).then((res) => {
          this.tableobj.allarr=[]
         /* this.topInput=''*/
          for(var i=0;i<res.data.data.length;i++){
            let my={}
            my.id=res.data.data[i].ad_id
            my.name=res.data.data[i].name
            my.index=i+1
            my.yunum=res.data.data[i].position
            my.show=res.data.data[i].status
            my.edittime=res.data.data[i].ctime
            my.btnarr=[{type:0,val:'查看'},{type:2,val:'恢复'},{type:3,val:'删除'}]
            this.tableobj.allarr.push(my)
          }
          this.clickpage(1)
        })
          .catch(function (err) {

          })
      },
      initdata(){
        let _this = this
        this.axios.post(this.apis+"/san/Advertisement/ajax_show1")
          .then((res)=> {
           if(res.data.code==10000){
             _this.tableobj.allarr=[]
             _this.numcount=res.data.data.length
             for(var i=0;i<res.data.data.length;i++){
               let my={}
               my.id=res.data.data[i].ad_id
               my.name=res.data.data[i].name
               my.index=i+1
               my.yunum=res.data.data[i].position
               my.show=res.data.data[i].status
               my.edittime=res.data.data[i].ctime
               my.btnarr=[{type:0,val:'查看'},{type:2,val:'恢复'},{type:3,val:'删除'}]
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
      document.title = '广告回收站'
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

</style>
