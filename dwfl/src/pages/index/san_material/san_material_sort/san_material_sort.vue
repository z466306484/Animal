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
            资料分类
          </div>
          <div class="listbox_do">
            <div class="addbox">
              <el-button  size="small " type="primary" @click="addsort"><i class="el-icon-plus"></i>新增一级分类</el-button>
              <el-button v-if="openstatus==0"  class="show_all"  size="small " type="primary" @click="openall">展开所有</el-button>
              <el-button v-if="openstatus==1" class="show_all"  size="small " type="primary" @click="openall">收起所有</el-button>
            </div>
          </div>
          <div class="martial_table">
            <!--表格-->
            <div class="tablebox">
              <!--表格头部-->
              <div class="mytable" style="background-color: #f2f2f2;">
                <div style="width: 50%">分类名称</div>
                <div style="width: 25%">状态</div>
                <div style="width: 25%">操作</div>
              </div>
              <!--表格-->
              <div class=""  v-for="(item, index) in tableobj.tabliearr">
              <!--一级-->
              <div style="display: flex" class="tr stair" >
                <div style="width: 50%;line-height: 40px">
                  <img class="sort_img open_img1" :src="item.open?'../../../../../static/img/sort1.png':'../../../../../static/img/sort2.png'" alt="" @click="openOne(item)">
                  <span style="display:inline-block;margin: 0px;vertical-align: middle;width: auto">{{item.cate_name}}</span>
                </div>
                <div style="width: 25%" v-if="item.status==1"> <p  class="textp">显示</p></div>
                <div style="width: 25%" v-if="item.status==2"> <p  class="textp">隐藏</p></div>
                <div style="width: 25%" class="one_btn"><span class="one_btn1" @click="addone(item.cate_id,item.parent_cate_id)">新增子分类</span> <span class="one_btn1" @click="editsort(item.cate_id)">编辑</span> <span class="one_btn2" @click="del(item.cate_id)">  删除</span> </div>
              </div>
              <!--二级-->
              <div   v-for="(index1,index) in item.son" v-if="item.open" >
                <div style="display: flex;" class="tr second" >
                  <div style="width: 50%;"><img class="sort_img open_img2" :src="index1.open?'../../../../../static/img/sort1.png':'../../../../../static/img/sort2.png'" alt="" @click="openTwo(index1)">
                    <img class="showimg" :src="index1.cate_img" alt="">
                    <span style="display:inline-block;margin: 0px;vertical-align: middle;width: auto">{{index1.cate_name}}</span>
                  </div>
                  <div style="width: 25%" v-if="index1.status==1"><p class="textp">显示</p></div>
                  <div style="width: 25%" v-if="index1.status==0"><p class="textp">隐藏</p></div>
                  <div style="width: 25%" class="one_btn"><span class="one_btn1" @click="addone(index1.cate_id,index1.parent_cate_id)">新增子分类</span> <span class="one_btn1" @click="editone(index1.cate_id,index1.parent_cate_id)">编辑</span> <span class="one_btn2" @click="del(index1.cate_id)">  删除</span> </div>
                </div>
                <!--三级-->
                <div   v-for="index2 in index1.son"  v-if="index1.open">
                  <div style="display: flex" class="tr third">
                    <div style="width: 50%;"><img  class="showimg showimg2" :src="index2.cate_img" alt="">
                      <span style="display:inline-block;margin: 0px;vertical-align: middle;width: auto">{{index2.cate_name}}</span>
                    </div>
                    <div style="width: 25%" v-if="index2.status==1"><p class="textp">显示</p></div>
                    <div style="width: 25%" v-if="index2.status==0"><p class="textp">隐藏</p></div>
                    <div style="width: 25%" class="one_btn"><span class="one_btn1" style="visibility: hidden">新增子分类</span> <span class="one_btn1" @click="editone(index2.cate_id,index2.parent_cate_id)">编辑</span> <span class="one_btn2" @click="del(index2.cate_id)">  删除</span> </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
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
  import popup from '@/components/sanpopup/sanpopup'
  import pagesnav from '@/components/sanpages/pages'
  import _cloneDeep from 'lodash/cloneDeep'
  import bus from '@/assets/evnetBus'
  export default {
    components: {leftnav,topnav,mterialtable,popup,pagesnav},
    data() {
      return {
        mincht:'',
        showpage:false,
        pageobj:{
          pagenum:5,
          nowindex:1,
        },
        alertobj:{
          delalert:false,
          alertitle:'删除提示',
          content:'确定要删除这个分类吗？',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        // 删除列表id
        deleteid:'',
        //顶部搜索框
        selectData: [
          {
            value: '0',
            label: '资料名称'
          }, {
            value: '1',
            label: '所属分类'
          }],
        topInput:'',
        selectvalue:'',
        addobj:{},
        //表格传递参数
        tableobj:{
          tharr:[{width:'50%',val:'分类名称'},{width:'25%',val:'状态'},{width:'25%',val:'操作'}],
          tabliearr: [],
          allarr:[]
        },
        select:[],
        openid:'',
        opentwoid:'',
        tablearr:[],
        openstatus:0,
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
      // 点击删除弹框方法
      alterdetai(obj){
        //点击弹框确定
        let _this=this
        if(obj.type==0){
          this.alertobj.delalert=false
          //  发请求
          this.axios.post(this.apis+'/san/Classify/ajax_del', {
            cate_id:this.deleteid,
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
                type: 'warning'
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
      del(obj){
        this.deleteid=obj//存储删除id
        this.alertobj.delalert=true  //  显示弹出框
      },
      todetai(obj){
        if(obj.type==1){
          this.$router.push('/didex?id='+obj.id)
        }
      },
      // 展开一级
      openOne(obj){
        if(obj.open){
          obj.open = false
        }else {
          obj.open = true
        }
      },
      openTwo(obj){
        this.openOne(obj)
      },
      // 展开所有
      openall(){
        if(this.openstatus==0){
           this.openstatus=1

        }else{
          this.openstatus=0
        }
        var _this=this
        var allarr=_this.tableobj.allarr
        if(allarr.length){
          for(let i =0;i<allarr.length;i++){
           if(this.openstatus==1){
             allarr[i].open = true
           }
            if(this.openstatus==0){
              allarr[i].open = false
            }
            if(allarr[i].son){
              for(let j = 0;j<allarr[i].son.length;j++){
                if(this.openstatus==1){
                  allarr[i].son[j].open = true
                }
                if(this.openstatus==0){
                  allarr[i].son[j].open = false
                }
              }
            }
          }
        }
        _this.tableobj.allarr=allarr
        _this.clickpage(this.pageobj.nowindex)
      },
      initdata(){
        let _this =  this
        this.axios.post(this.apis+"/san/Classify/show_ajax")
          .then((res)=> {
          if(res.data.code==10000){
            _this.tableobj.allarr=[]
            var allarr = res.data.data
            if(allarr.length){
              for(let i =0;i<allarr.length;i++){
                allarr[i]['open'] = false
                if(allarr[i].son){
                  for(let j = 0;j<allarr[i].son.length;j++){
                    allarr[i].son[j]['open'] = false
                  }
                }
              }
            }
            _this.tableobj.allarr=allarr
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
      editsort(obj){
        this.$router.push({path:'/san_material_sort_addone?type=2&&obj='+obj})
      },
      addsort(){
        this.$router.push({path:'/san_material_sort_addone?type=1'})
      },
      addone(obj,preobj){
        this.$router.push({path:'/san_material_sort_addtwo?type=1&&obj='+obj+'&&data='+preobj})
      },
      editone(obj,preobj){
        this.$router.push({path:'/san_material_sort_addtwo?type=2&&obj='+obj+'&&data='+preobj})
      },
    },
    mounted(){
      this.mincht = (this.docheight )  +'px'
    },
    created() {
      document.title = '资料分类'
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
            display: flex;
            margin-top: 30px;
            margin-bottom: 30px;
            .list_inputs{
              width:45%;
              margin-left: 25%;
              .topinput{
                width: auto;
              }
            }
            .addbox{
              width: 30%;
              margin-left:2.5%;
              .show_all{
                background-color: white;
                border: 1px solid #cccccc;
                color: #333;
                width: 120px;
              }
            }
          }
        }
      }
    }
  }
  /*表格*/
  .textp{
    margin: 0px;line-height: 40px;
  }
  .table{
    border-collapse:collapse;
    .graythead{
      background-color: #f2f2f2;
    }
  }
  .imgdiv{
    display: flex;
  }
  .table_td{
    td{
      text-indent: 9px;
    }
  }
  .sortEdit{
    line-height: 30px !important;
  }
  .table_td:hover{
    background-color: #f2f2f2;
  }
  .sortEdit>.imgdiv{
    display: flex;
  }
  .bluebtn{
    padding: 5px 10px;
    text-decoration: none;
    color: rgb(49,141,235);
    border: 1px solid rgb(49,141,235);
    border-radius: 3px;
    cursor: pointer;
  }
  .mytable{
    font-size: 12px;
    display: flex;
    width: 100%;
    border-top: 1px solid #ebebeb;
    border-right:1px solid #ebebeb ;
    border-left:1px solid #ebebeb ;
  }
  .mytable>div{
    width: 100%;
    padding: 15px 0px;
    text-indent: 9px;
  }
  .tr{
    padding: 15px 0px;
    text-indent: 9px;
    font-size: 12px;
    border-bottom: 1px solid #ebebeb;
    border-right:1px solid #ebebeb ;
    border-left:1px solid #ebebeb ;
  }
  .one_btn{
    span{
      margin-right: 15px;
      cursor: pointer;
      line-height: 40px;
    }
    .one_btn1{
      color: #2e8ded;
    }
    .one_btn2{
      color: #ff3300;
    }
  }
  .sort_img{
    cursor: pointer;
    vertical-align: middle;
  }
  .showimg{
    margin-right: 10px;
    width:36px;
    height:36px;
    margin-left: 10px;
    vertical-align: middle;
  }
  .showimg2{
    margin-left: 100px;
  }
  .open_img2{
    margin-left: 40px;
  }
</style>
