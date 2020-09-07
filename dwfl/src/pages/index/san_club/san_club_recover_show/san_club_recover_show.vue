<template>
  <div class="container"   v-if="showpage" :style="'min-height:'+ mincht">
    <leftnav></leftnav>
    <div class="rightbox">
      <div class="topbox">
        <topnav></topnav>
      </div>
      <!--首页内容-->
      <div class="content">
        <div class="listbox">
          <div class="listbox_title">
            社群详情<el-button size="small" class="return_list" @click="returnback()">返回列表</el-button>
          </div>
          <div class="show_table">
            <!--展示-->
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="基本信息" name="first">
                <div class="first_show">
                  <div class="show_table_list">
                    <div class="list_one"><p>社群名称</p></div>
                    <div><p>{{showData.name}}</p></div>
                  </div>
                  <div class="show_table_list">
                    <div class="list_one"><p>社群封面</p></div>
                    <div><img class="show_img" :src="showData.community_pic" alt=""></div>
                  </div>
                  <div class="show_table_list">
                    <div class="list_one"><p>社群简介</p></div>
                    <div><p>{{showData.introduction}}</p></div>
                  </div>
                 <div class="show_table_list">
                  <div class="list_one"><p>是否推荐</p></div>
                  <div>
                    <p v-if="showData.is_Top==0">不推荐</p>
                    <p v-if="showData.is_Top==1">推荐</p>
                  </div>
                </div>
                 <div class="show_table_list">
                    <div class="list_one"><p>状态</p></div>
                    <div>
                      <p v-if="showData.status==0">回收站</p>
                      <p v-if="showData.status==1">显示</p>
                      <p v-if="showData.status==2">隐藏</p>
                  </div>
                 </div>
                 <div class="show_table_list">
                    <div class="list_one"><p>排序</p></div>
                    <div><p>{{showData.sort}}</p></div>
                  </div>
                   <div class="show_table_list">
                    <div class="list_one"><p>创建人</p></div>
                    <div><p> <span v-if="showData.is_Admin==1">管理员</span> <span class="removeWx">{{showData.username}}</span></p></div>
                   </div>
                  <div class="show_table_list footerlist">
                    <div class="list_one"><p>创建时间</p></div>
                    <div><p>{{showData.ctime}}</p></div>
                  </div>
                 <!-- <div class="show_table_list" v-if="this.title==2">
                    <div class="list_one"><p>删除人</p></div>
                    <div><p>管理员 <span class="removeWx">admin</span></p></div>
                  </div>
                  <div class="show_table_list" v-if="this.title==2">
                    <div class="list_one"><p>删除时间</p></div>
                    <div><p>2019-02-24  15:25:12</p></div>
                  </div>-->
                </div>
              </el-tab-pane>
              <el-tab-pane label="社群成员" name="second">
                <div class="second_show">
                  <mterialtable :tableobj="tableobj" @todetai="todetai"></mterialtable>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import topnav from '@/components/sannav/top'
  import leftnav from  '@/components/sannav/left'
  import mterialtable from '@/components/santable/santable8'
  export default {
    components: {leftnav,topnav,mterialtable},
    data() {
      return {
        mincht:'',
        showpage:false,
        activeName: 'first',
        tableobj:{
          tharr:[{width:'25%',val:'用户'},{width:'15%',val:'性别'},{width:'15%',val:'单位'},{width:'15%',val:'职位'},{width:'15%',val:'动态数'},{width:'15%',val:'加入时间'}],
          tabliearr:[],
        },
        title:'',
        searchid:'',
        // 页面数据
        showData:''
      }
    },
    props: {},
    mounted(){
      this.mincht = (this.docheight )  +'px'
    },
    methods: {
      handleClick(tab, event) {
        // 社团查看
        if(this.title==1){
          if(tab.index==1){
            this.axios.post(this.apis+'/san/community/showcomperson', {
              id:this.searchid,
            }).then((res) => {
              this.tableobj.tabliearr=[]
              for(var i=0;i<res.data.data.length;i++) {
                let my = {}
                my.img = res.data.data[i].photos
                my.name = res.data.data[i].nickname
                my.work = res.data.data[i].is_create
                my.yunum = res.data.data[i].user_sex
                my.phnum = res.data.data[i].user_company
                my.joinnum = res.data.data[i].user_occupation
                my.time = res.data.data[i].dynamic_number
                my.time1 = res.data.data[i].join_time
                this.tableobj.tabliearr.push(my)
              }
            })
              .catch(function (err) {
              })
          }
        }
        // 社团回收站查看
        if(this.title==2){
          if(tab.index==1){
            this.axios.post(this.apis+'/san/community/showcomperson', {
              id:this.searchid,
            }).then((res) => {
              this.tableobj.tabliearr=[]
              for(var i=0;i<res.data.data.length;i++) {
                let my = {}
                my.img = res.data.data[i].photos
                my.name = res.data.data[i].nickname
                my.work = res.data.data[i].is_create
                my.yunum = res.data.data[i].user_sex
                my.phnum = res.data.data[i].user_company
                my.joinnum = res.data.data[i].user_occupation
                my.time = res.data.data[i].dynamic_number
                my.time1 = res.data.data[i].join_time
                this.tableobj.tabliearr.push(my)
              }
            })
              .catch(function (err) {
              })
          }
        }
      },
      todetai(obj){
        if(obj.type==1){
          this.$router.push('/didex?id='+obj.id)
        }
      },
      returnback(){
        this.$router.go(-1)
      },
      // init数据
      getinfo(){
        let _this=this
        // 请求当前页面数据
        if(this.title==1){
          this.axios.post('http://dongwu.siantest.com/san/community/show', {
            id:this.searchid,
          }).then((res) => {
            if(res.data.code==10000){
              console.log(res.data.data)
              _this.showData=res.data.data
              _this.showpage=true
            }
            if(res.data.code==10008){
              _this.$router.push({path:'/san_login'})
            }
          })
            .catch(function (err) {
            })
        }
        if(this.title==2){
          this.axios.post(this.apis+'/san/community/show', {
            id:this.searchid,
          }).then((res) => {
            if(res.data.code==10000){
              console.log(res.data.data)
              _this.showData=res.data.data
              _this.showpage=true
            }
            if(res.data.code==10008){
              _this.$router.push({path:'/san_login'})
            }
          })
            .catch(function (err) {
            })
        }
      }
    },
    created() {
      document.title = '社群详情'
      if(this.$route.query.type){
        this.title=this.$route.query.type
      }
      if(this.$route.query.id){
        this.searchid=this.$route.query.id
      }
      this.getinfo();
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
          .show_table{
            margin-left:5%;
            width: 90%;
            min-height: 500px;
            margin-top: 30px;
          }
          .listbox_title{
            padding: 15px 0px 15px 30px;
            font-size: 12px;
            border-bottom: 1px solid #e4e4e4;
            .return_list{
              margin-left:85%;
              text-decoration:none;
              color: #666666;
              display: inline-block;
            }
          }
        }
      }
    }
  }
  .first_show{
    width:50%;
   /* margin-left: 15%;*/
    min-height: 500px;
    margin-top: 20px;
    .show_table_list{
      display: -webkit-box;
      font-size: 14px;
      div{
        p{
          margin-top: 10px;
          margin-bottom: 10px;
          padding-top: 8px;
          line-height: 1.5em;
          height: auto;
          word-wrap: break-word;
          word-break: break-all;
          overflow: hidden;
          .removeWx{
            color: #169bd5;
            margin-left: 10px;
            cursor: pointer;
          }
        }
        .show_img{
          width: 160px;
          height: 110px;
          margin-top: 15px;
        }
      }
      .list_one{
        width:25%;
        font-weight: 600;
        text-align: right;
        margin-right:40px;
        color: #333333;
      }
    }
  }
  .second_show{
    width:98%;
    margin-left:1%;
    min-height: 500px;
    margin-top: 20px;
    .show_table_list{
      display: flex;
      font-size: 14px;
      div{
        p{
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .show_img{
          width: 160px;
          height: 110px;
          margin-top: 15px;
        }
      }
      .list_one{
        width:15%;
        text-align: right;
        margin-right:40px;
        color: #333333;
      }
    }
  }
  .footerlist{
    padding-bottom: 30px;
  }
  .a_style{
    text-decoration: none;
    color: #409eff;
  }
</style>
