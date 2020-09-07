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
              资料列表
             </div>
             <div class="listbox_do">
                 <div class="addbox">
                   <el-button  size="small" :disabled="roleaddshow" type="primary" @click="addmaterial"><i class="el-icon-plus"></i>新增资料</el-button>
                 </div>
               <div class="list_inputs">
                <!--选择框-->
                 <el-select size="small " clearable v-model="selectvalue" placeholder="请选择搜索类型">
                   <el-option
                     v-for="item in selectData"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                   </el-option>
                 </el-select>
                 <!--输入框-->
                 <el-input  size="small" clearable class="topinput" v-model="topInput" placeholder="输入关键字查找"></el-input>
                 <!--按钮-->
                 <el-button size="small " type="primary" @click="findmaterial">查找</el-button>
               </div>
             </div>
             <div class="martial_table">
               <mterialtable  :tableobj="tableobj" @todetai="todetai($event)"></mterialtable>
             </div>
            <!--  分页-->
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
  import mterialtable from '@/components/santable/santable2'
  import pagesnav from '@/components/sanpages/pages'
  import popup from '@/components/sanpopup/sanpopup'
  import _cloneDeep from 'lodash/cloneDeep'
  import bus from '@/assets/evnetBus'
  export default {
    components: {leftnav,topnav,mterialtable,pagesnav,popup},
    data() {
      return {
        fullscreenLoading: false,
        mincht:'',
        //顶部搜索框
        showpage:false,
        pageobj:{
          pagenum:15,
          nowindex:1,
        },
        selectData: [
          {
          value: '1',
          label: '资料名称'
        }, {
          value: '2',
          label: '所属分类'
        }],
        topInput:'',
        selectvalue:'',
        //表格传递参数
        tableobj:{
          tharr:[{width:'5%',val:'id'},{width:'22%',val:'资料名称'},{width:'7%',val:'所属分类'},{width:'10%',val:'是否推荐'},{width:'15%',val:'阅读/评论/收藏/点赞'},{width:'8%',val:'状态'},{width:'13%',val:'发布时间'},{width:'20%',val:'操作'}],
          tabliearr:[],
          allarr:[],
          roleeditshow:true,
        },
         //  弹框参数
        alertobj:{
          delalert:false,
          alertitle:'删除提示',
          content:'确定要删除这个资料吗？',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        // 删除列表id
        deleteid:'',
        queobj:'',
        editobj:'',
        addobj:'',
        rolebox:'',
        roleaddshow:true,
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
          this.$router.push({path:'/san_material_recover_show?type=1&&id='+obj.item.id})
        }
        if(obj.type==2){//点击编辑的方法
          this.$router.push({path:'/san_material_add?type=2&&id='+obj.item.id})
        }
        if(obj.type==3){//点击删除的方法
          this.deleteid=obj.item.id //存储删除id
          this.alertobj.delalert=true  //  显示弹出框
        }
      },
     // 点击删除弹框方法
      alterdetai(obj){
        //点击弹框确定
        let _this = this
        if(obj.type==0){
          this.alertobj.delalert=false
           //  发请求
          this.axios.post(this.apis+'/san/Material/ajax_del', {
            article_id:this.deleteid,
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
     // 查找方法
      findmaterial(){
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
        this.axios.post(this.apis+'/san/Material/search', {
          key:this.selectvalue,
          search:this.topInput,
          status:1
          }).then((res) => {
          if(res.data.code==10000){
            this.tableobj.allarr=[]
            for(var i=0;i<res.data.data.length;i++){
              let my={}
              my.id=res.data.data[i].article_id
              my.name=res.data.data[i].name
              my.index=i+1
              my.img=res.data.data[i].covers_pic
              my.yunum=res.data.data[i].cate_name
              my.phnum=res.data.data[i].is_top
              my.joinnum=res.data.data[i].views+"/"+res.data.data[i].pl+"/"+res.data.data[i].sc+"/"+res.data.data[i].dz
              my.mstatus=res.data.data[i].status
              my.articletime=res.data.data[i].ctime
              my.btnarr=[{type:0,val:'查看'},{type:2,val:'编辑'},{type:3,val:'删除'}]
              this.tableobj.allarr.push(my)
            }
            this.clickpage(1)
          }
          })
            .catch(function (err) {
            })
      },
      initdata(){
        let _this =  this
        this.axios.post(this.apis+"/san/Material/index", {
          status:1,
        })
          .then((res)=> {
           if(res.data.code==10000){
             _this.tableobj.allarr=[]
             for(var i=0;i<res.data.data.length;i++){
               let my={}
               my.id=res.data.data[i].article_id
               my.index=i+1
               my.name=res.data.data[i].name
               my.img=res.data.data[i].covers_pic
               my.yunum=res.data.data[i].cate_name
               my.phnum=res.data.data[i].is_top
               my.joinnum=res.data.data[i].views+"/"+res.data.data[i].pl+"/"+res.data.data[i].sc+"/"+res.data.data[i].dz
               my.mstatus=res.data.data[i].status
               my.articletime=res.data.data[i].ctime
               my.btnarr=[{type:0,val:'查看'},{type:2,val:'编辑'},{type:3,val:'删除'}]
               _this.tableobj.allarr.push(my)
             }
             _this.clickpage(1)
             _this.showpage = true
             _this.fullscreenLoading = false;
           }
           if(res.data.code==10008){
              _this.$router.push({path:'/san_login'})
            }
          })
          .catch(function (err) {
          })
      },
      addmaterial(){
        this.$router.push({path:'/san_material_add?type=1'})
      },
      roleshow(){
        let _this=this
        this.axios.post(this.apis+'/san/Login/get_user').then((res) => {
          if(res.data.code==10000){
            if(res.data.data){
              _this.rolebox=res.data.data.rule_id
            }
            for(var i=0;i<_this.rolebox.length;i++){
              if(_this.rolebox[i].id==2){
                _this.roleaddshow=false
              }
              if(_this.rolebox[i].id==3){
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
      document.title = '资料列表'
      this.roleshow()
      this.initdata()
      this.fullscreenLoading = true;
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
            min-height: 30px;
            margin-top: 30px;
            margin-bottom: 30px;
            .list_inputs{
              width:auto;
              /*margin-left:23%;*/
              float: right;
              margin-right: 2%;
              .topinput{
                width: auto;
              }
            }
            .addbox{
              float: left;
              width: 30%;
              margin-left:2.5%;
            }
          }
        }
      }
    }
  }
  .okalert{
    display: none;
    position: absolute;
    top:300px;
    left: 50%;
    width: 120px;
  }
</style>
