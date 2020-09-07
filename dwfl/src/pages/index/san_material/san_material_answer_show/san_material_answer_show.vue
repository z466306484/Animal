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
            评论详情<el-button  class="return_list" size="small"  @click="returnback()">返回列表</el-button>
          </div>
          <div class="show_table">
            <div class="show_table_list">
              <div class="list_one"><p>资料名称</p></div>
              <div><p style="color: #2e8ded;cursor: pointer" @click="showtitle()">{{showData.name}}</p></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>资料封面</p></div>
              <div><img class="show_img" :src="showData.covers_pic" alt=""></div>
            </div>
            <div class="show_table_list" style="margin-top:20px">
              <div class="list_one"><p>评论人</p></div>
              <div><img class="show_person_img" :src="showData.photos"></div>
              <div style="padding-left: 15px"><p style="color:#2e8ded;line-height:30px">{{showData.nickname}}</p></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>所在单位</p></div>
              <div><p v-if="showData.user_company">{{showData.user_company}}</p><p v-if="!showData.user_company">无</p></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>职业</p></div>
              <div><p v-if="showData.user_occupation">{{showData.user_occupation}}</p><p v-if="!showData.user_occupation">无</p></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>评论内容</p></div>
              <div  style="width: 90%"><p v-html="showData.ucontent">{{showData.ucontent}}</p><p v-if="!showData.ucontent">无</p></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>获赞</p></div>
              <div><p>{{showData.dz}}</p></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>评论时间</p></div>
              <div><p>{{showData.ctime}}</p></div>
            </div>
            <div class="show_table_list" v-if="showData.acontent">
              <div class="list_one"><p>管理员回复</p></div>
              <div  style="width: 90%"><p><span style="color: #2e8ded">{{showData.username}}:</span> {{showData.acontent}}</p></div>
            </div>
            <div class="show_table_list footerlist"  v-if="showData.acontent">
              <div class="list_one"><p>回复时间</p></div>
              <div><p>{{showData.atime}}</p></div>
            </div>
            <!--评论详情回收站多余的-->
            <!--<div class="show_table_list">
              <div class="list_one"><p>删除时间</p></div>
              <div><p>2019-02-24  12:45:15</p></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>删除人</p></div>
              <div><p>admin</p></div>
            </div>-->
            <div class="show_btns" v-if="this.title==1" >
                 <div class="reanswer" @click="reanswer"><p>回复</p></div>
                 <div class="del" @click="del1back"><p>删除</p></div>
            </div>
            <!--回收站详情按钮-->
            <div class="show_btnsreback" v-if="this.title==2">
                 <div style="margin-right: 20px" class="del" @click='reback'><p>恢复</p></div>
                 <div class="del" @click="delback"><p>彻底删除</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <popup  :alertobj="alertobj" @alterdetai="alterdetai($event)"></popup>
    <popup  :alertobj="realertobj" @alterdetai="alterredetai($event)"></popup>
    <!--删除弹框-->
    <popup  :alertobj="alert1obj" @alterdetai="alter1detai($event)"></popup>
    <!--回复弹框-->
    <div class="boxalertimg" v-if="answeralertobj.answeralert">
      <div class="delalert">
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
  import popup from '@/components/sanpopup/sanpopup'

  export default {
    components: {leftnav,topnav,popup},
    data() {
      return {
        mincht:'',
        showpage:false,
        //恢复弹框参数
        realertobj:{
          delalert:false,
          alertitle:'恢复提示',
          content:'确定要恢复这个评论吗？',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        //chedi删除弹框参数
        alertobj:{
          delalert:false,
          alertitle:'删除提示',
          content:'确定要彻底删除这个评论吗？',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        //  删除弹框参数
        alert1obj:{
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
        searchid:'',
        title:'',
        showData:'',
        mincht:'',
      }
    },
    props: {},
    methods: {
      returnback(){
        this.$router.go(-1)
      },
      // init数据
      getinfo(){
        // 请求当前页面数据
        let _this=this
        if(this.title==1){
          this.axios.post(this.apis+'/san/Material/reply_details', {
            comment_id:this.searchid,
          }).then((res) => {
            if(res.data.code==10000){
              _this.showpage= true
              _this.showData=res.data.data
              _this.answeralertobj.content=res.data.data.acontent
            }
            if(res.data.code==10008){
              _this.$router.push({path:'/san_login'})
            }

          })
            .catch(function (err) {
            })
        }
        if(this.title==2){
          this.axios.post(this.apis+'/san/Material/reply_details', {
            comment_id:this.searchid,
          }).then((res) => {
            if(res.data.code==10000){
              this.showData=res.data.data
              _this.showpage= true
            }
            if(res.data.code==10008){
              _this.$router.push({path:'/san_login'})
            }
          })
            .catch(function (err) {
            })
        }
      },
      // 点击弹框确定删除方法
      alterdetai(obj){
        //点击弹框确定
        if(obj.type==0){
          this.alertobj.delalert=false
          this.axios.post(this.apis+'/san/Material/reply_delete',{
            comment_id:this.searchid,
          }).then((res) => {
            if(res.data.code==10000){
              this.$router.go(-1)
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
          this.axios.post(this.apis+'/san/Material/reply_reco',{
            comment_id:this.searchid,
          }).then((res) => {
            if(res.data.code==10000){
              this.$router.go(-1)
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
     //弹框点击确认回复
      submitanwser(){
        this.answeralertobj.answeralert=false
        //  发请求
        if(this.answeralertobj.content==''||this.answeralertobj.content==undefined){
         this.answeralertobj.content=this.showData.acontent
          this.$message({
            duration:1000,
            center: true,
            message: '回复内容不能为空',
            type: 'error'
          });
          return false
        }
        this.axios.post(this.apis+'/san/Material/reply',{
          comment_id:this.searchid,
          acontent:this.answeralertobj.content
        }).then((res) => {
          if(res.data.code==10000){
            this.$router.go(-1)
          }
        })
          .catch(function (err) {
          })
      },
      alter1detai(obj){
        //点击弹框确定
        if(obj.type==0){
          this.alert1obj.delalert=false
          this.axios.post(this.apis+'/san/Material/reply_del',{
            comment_id:this.searchid,
          }).then((res) => {
            if(res.data.code==10000){
              this.$router.go(-1)
            }
          })
            .catch(function (err) {
            })
        }
        //点击弹框取消
        if(obj.type==2){
          this.alert1obj.delalert=false
        }
      },
      reback(){
        this.realertobj.delalert=true
      },
      delback(){
        this.alertobj.delalert=true
      },
      del1back(){
        this.alert1obj.delalert=true
      },
      reanswer(){
        this.answeralertobj.answeralert=true
      },
      showtitle(){
        this.$router.push({path:'/san_material_recover_show?type=1&&id='+this.showData.article_id})
      }
    },
    mounted(){
      this.mincht = (this.docheight )  +'px'
    },
    created() {
      document.title = '评论详情'
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
            width: 60%;
            margin-left:10%;
            min-height: 500px;
            margin-top: 50px;
            .show_table_list{
              display: -webkit-box;
              font-size: 14px;
              div{
                p{
                  margin-top: 10px;
                  margin-bottom: 10px;
                  width: 100%;
                  height: auto;
                  word-wrap: break-word;
                  word-break: break-all;
                  overflow: hidden;
                  padding-bottom: 8px;
                  line-height:1.5em;
                }
                .show_img{
                  width: 160px;
                  height: 110px;
                  margin-top: 15px;
                }
                .show_person_img{
                  width: 50px;
                  height: 50px;
                  border-radius: 25px;
                }
              }
              .list_one{
                width:15%;
                font-weight: 600;
                text-align: right;
                margin-right:40px;
                color: #333333;
              }
            }
            .show_btns{
              width:80% ;
              margin-left: 20%;
              height:120px;
              display: flex;
              margin-top: 20px;
              .reanswer{
                height: 30px;
                width: 65px;
                background-color: #2e8ded;
                cursor: pointer;
                border-radius: 3px;
                margin-right: 20px;
                p{
                  margin: 0px;
                  line-height: 30px;
                  text-align: center;
                  color: white;
                  font-size: 14px;
                }
              }
              .del:hover{
                background-color: #ff3300;
                color: white;
                border: 1px solid #ff3300;
              }
              .del{
                height: 30px;
                width: 65px;
                border: 1px solid #cccccc;
                cursor: pointer;
                border-radius: 3px;
                color: #666666;
                p{
                  margin: 0px;
                  line-height: 30px;
                  text-align: center;
                  font-size: 14px;
                }
              }
            }
            .show_btnsreback{
              width:80% ;
              margin-left: 20%;
              height:120px;
              display: flex;
              margin-top: 20px;
              .del:hover{
                background-color: #ff3300;
                color: white;
                border: 1px solid #ff3300;
              }
              .del{
                height: 30px;
                width: 65px;
                border: 1px solid #cccccc;
                cursor: pointer;
                border-radius: 3px;
                color: #666666;
                p{
                  margin: 0px;
                  line-height: 30px;
                  text-align: center;
                  font-size: 14px;
                }
              }
            }
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
  .footerlist{
    padding-bottom: 30px;
  }
  .boxalertimg{
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
</style>
