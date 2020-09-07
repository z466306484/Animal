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
            动态详情<el-button class="return_list" size="small" @click="returnback()">返回列表</el-button>
          </div>
          <!--  //总展示框-->
          <div class="show_table">
               <!--上展示框-->
              <div class="show_table_one">
                   <div class="top_box">
                        <div>
                            <div style="width: 10%;margin-left: 5%">
                              <img :src="showData.photos" alt="">
                            </div>
                           <div>
                            <p class="trendsp">{{showData.nickname}}<span style="color: #a1a1a1;margin-left: 20px">{{showData.ctime}}</span></p>
                           </div>
                        </div>
                        <div style="width: 15%;margin-left: 35%" class="show_btn">
                             <div  @click="answeralertobj.answeralert =true" v-if="this.title==1" class="show_btn" style="border: 1px solid #2e8ded"> <p style="color:#2e8ded ">回复</p></div>
                             <div @click="realertobj.delalert = true" v-if="this.title==2" class="show_btn" style="border: 1px solid #2e8ded"> <p style="color:#2e8ded ">恢复</p></div>
                             <div @click="alertobj.delalert =true" class="show_btn" style="border: 1px solid #ff3300" v-if="this.title==1"> <p style="color:#ff3300 ">删除</p></div>
                             <div @click="delalertobj.delalert =true" class="show_btn" style="border: 1px solid #ff3300" v-if="this.title==2"> <p style="color:#ff3300 ">删除</p></div>
                        </div>
                   </div>
                   <div class="show_content">
                    <p class="toptext">{{showData.content}}</p>
                      <div class="imgbox">
                        <video v-if="showData.video" :src="showData.video" style=" width: 125px;height: 160px;" controls="controls"></video>
                        <img  @click="showimg(index)"  v-if="showData.picture" class="show_img" v-for="index in showData.picture" :src="index"  alt="">
                     </div>
                     <div class="forwordbox" v-if="showData.is_forward==1">
                       <div class="forwordimg">
                         <video v-if="showData.forward_dynamic_video" :src="showData.forward_dynamic_video" style=" width: 125px;height: 160px;" controls="controls"></video>
                         <img  @click="showimg(index)"  v-if="showData.forward_dynamic_picture" :src="showData.forward_dynamic_picture"  alt="">
                       </div>
                       <div class="forwordtext">
                          <p><span class="forwordname">{{showData.forward_user_nickname}}:</span>{{showData.forward_dynamic_content}}</p>
                       </div>
                     </div>
                    </div>
              </div>
              <p class="advert_num">留言列表 <span>{{totlenum}}条</span></p>
              <!--列表展示-->
               <trensdtable class="trenstable"  :tableobj="tableobj" @todetai="todetai"></trensdtable>
              <!--分页-->
              <div style="margin-top: 30px;display: flex;align-items: center;" v-if="pageobj!=''">
                <pagesnav @clickpage="clickpage" :pageobj="pageobj" :tabliearr="tableobj.allarr"></pagesnav>
              </div>
          </div>
        </div>
      </div>
    </div>
    <!--图片放大-->
    <!--弹框-->
    <div class="alertimg" @click="hideimg">
      <img id="imgdiv" >
    </div>
    <!--回复弹框-->
    <div class="boxalertimg" v-if="answeralertobj.answeralert">
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
    <popup  :alertobj="realertobj" @alterdetai="alterredetai($event)"></popup>
    <popup  :alertobj="alertobj" @alterdetai="alterdetai($event)"></popup>
    <popup  :alertobj="delalertobj" @alterdetai="delalterdetai($event)"></popup>
    <popup  :alertobj="plalertobj" @alterdetai="plalterdetai($event)"></popup>
  </div>
</template>

<script>
  import topnav from '@/components/sannav/top'
  import leftnav from  '@/components/sannav/left'
  import trensdtable from '@/components/santable/santable7'
  import popup from '@/components/sanpopup/sanpopup'
  import pagesnav from '@/components/sanpages/pages'
  import _cloneDeep from 'lodash/cloneDeep'
  import bus from '@/assets/evnetBus'
  export default {
    components: {leftnav,topnav,trensdtable,popup,pagesnav},
    data() {
      return {
        title:'',
        info:'',
        pageobj:{
          pagenum:15,
          nowindex:1,
        },
        tableobj:{
          tharr:[{width:'25%',val:'留言人'},{width:'30%',val:'留言内容'},{width:'25%',val:'留言时间'},{width:'15%',val:'操作'}],
          tabliearr:[],
          allarr:[],
        },
        //动态列表回复弹框参数
        answeralertobj:{
          answeralert:false,
          alertitle:'回复操作',
          content:'',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        // 回复列表id
        answerid:'',
        //回收站恢复弹框参数
        realertobj:{
          delalert:false,
          alertitle:'恢复提示',
          content:'确定要恢复这条动态吗？',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        rebackid:'',
        // 动态列表删除弹框参数
        alertobj:{
          delalert:false,
          alertitle:'删除提示',
          content:'确定要删除这条动态吗？',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        // 回收站列表删除弹框参数
        delalertobj:{
          delalert:false,
          alertitle:'删除提示',
          content:'确定要彻底删除这条动态吗？',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        // 评论列表删除弹框参数
        plalertobj:{
          delalert:false,
          alertitle:'删除提示',
          content:'确定要删除这条留言吗？',
          btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
        },
        pldelid:'',
        searchid:'',
        showData:'',
        totlenum:'',
        mincht:'',
        showpage:false
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
      todetai(obj){
        // 删除
        if(obj.type==3){
         this.plalertobj.delalert=true  //  显示弹出框
         this.pldelid= obj.item.id
        }
      },
      //弹框点击确认回复
      submitanwser(){
        this.answeralertobj.answeralert=false
        //  发请求
        if(this.answeralertobj.content==''||this.answeralertobj.content==undefined){
          this.$message({
            duration:1000,
            center: true,
            message: '回复内容不能为空',
            type: 'error'
          });
          return false
        }
        let _this=this
        this.axios.post(this.apis+'/san/dynamic/revise', {
          dynamic_id:this.searchid,
          content:this.answeralertobj.content
        }).then((res) => {
          if(res.data.code==10000){
            this.answeralertobj.content=''
            this.$message({
              duration:1000,
              center: true,
              message: '已回复',
              type: 'success'
            });
            setTimeout(()=>{
              _this.initpldata()
            },1000)
          }
        })
          .catch(function (err) {
          })
      },
      //点击弹框确定恢复方法
      alterredetai(obj){
        let _this=this
        //点击弹框确定
        if(obj.type==0){
          this.realertobj.delalert=false
          //  发请求
          this.axios.post(this.apis+'/san/dynamic/save', {
            id:this.searchid,
          }).then((res) => {
            if(res.data.code==10000){
              this.$message({
                duration:1000,
                center: true,
                message: '已恢复',
                type: 'success'
              });
              setTimeout(()=>{
                _this.$router.push({path:'/san_club_trends_rocover'})
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
      // 点击删除弹框方法
      alterdetai(obj){
        //点击弹框确定
        let _this=this
        if(obj.type==0){
          this.alertobj.delalert=false
          //  发请求
          this.axios.post(this.apis+'/san/dynamic/del',{
            id:this.searchid,
          }).then((res) => {
            if(res.data.code==10000){
              this.$message({
                duration:1000,
                center: true,
                message: '已删除',
                type: 'success'
              });
              setTimeout(()=>{
                _this.$router.push({path:'/san_club_trends'})
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
      // 回收站点击删除弹框方法
      delalterdetai(obj){
        //点击弹框确定
        if(obj.type==0){
          this.delalertobj.delalert=false
          //  发请求
          let _this=this
          this.axios.post(this.apis+'/san/dynamic/delete',{
            id:this.searchid,
          }).then((res) => {
            if(res.data.code==10000){
              this.$message({
                duration:1000,
                center: true,
                message: '已删除',
                type: 'success'
              });
              setTimeout(()=>{
                _this.$router.push({path:'/san_club_trends_rocover'})
              },1000)
            }
          })
            .catch(function (err) {
            })
        }
        //点击弹框取消
        if(obj.type==2){
          this.delalertobj.delalert=false
        }
      },
      // 留言点击删除弹框方法
      plalterdetai(obj){
        //点击弹框确定
        let _this=this
        if(obj.type==0){
          this.plalertobj.delalert=false
          //  发请求
          this.axios.post(this.apis+'/san/dynamic/delmessage',{
            id:this.pldelid,
          }).then((res) => {
            if(res.data.code==10000){
              this.$message({
                duration:1000,
                center: true,
                message: '已删除',
                type: 'success'
              });
              setTimeout(()=>{
                _this.initpldata()
              },1000)
            }
          })
            .catch(function (err) {
            })
        }
        //点击弹框取消
        if(obj.type==2){
          this.plalertobj.delalert=false
        }
      },
      // init数据
      getinfo(){
        // 请求当前页面数据
        console.log("id")
        console.log(this.searchid)
        console.log(this.title)
        let _this=this
        if(this.title==2){
          this.axios.post(this.apis+'/san/dynamic/show', {
            id:this.searchid,
          }).then((res) => {
            console.log(res.data)
            if(res.data.code==10000){
              console.log("data")
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
          // 请求列表
          _this.initpldata()
        }
        if(this.title==1){
          console.log("id")
          console.log(this.searchid)
          console.log(this.title)
          this.axios.post('http://dongwu.siantest.com/san/dynamic/show', {
            id:this.searchid,
          }).then((res) => {
            if(res.data.code==10000){
              console.log(res.data)
              _this.showData=res.data.data
              _this.showpage=true
            }
            if(res.data.code==10008){
              _this.$router.push({path:'/san_login'})
            }
          })
            .catch(function (err) {
            })
           // 请求列表
          _this.initpldata()
        }
      },
      returnback(){
        this.$router.go(-1)
      },
      initpldata(){
        let  _this=this
        this.axios.post(this.apis+'/san/dynamic/messageshow', {
          id:this.searchid,
        }).then((res) => {
          this.totlenum=res.data.data.number
          this.tableobj.allarr=[]
          for(var i=0;i<res.data.data.data.length;i++){
            let my={}
            my.id=res.data.data.data[i].message_id
            my.admin=res.data.data.data[i].is_admin
            my.name=res.data.data.data[i].nickname
            my.img=res.data.data.data[i].photos
            my.yunum=res.data.data.data[i].content
            my.phnum=res.data.data.data[i].ctime
            my.btnarr=[{type:3,val:'删除'}]
            this.tableobj.allarr.push(my)
          }
          _this.clickpage(1)
        })
          .catch(function (err) {
          })
      },
      showimg(index){
        $('#imgdiv').attr('src',index);
        $('.alertimg').show()
      },
      hideimg(){
        $('.alertimg').hide()
      }
    },
    mounted(){
      this.mincht = (this.docheight )  +'px'
    },
    created() {
      document.title = '动态详情'
      if(this.$route.query.type){
        this.title=this.$route.query.type
      }
      if(this.$route.query.id){
        this.searchid=this.$route.query.id
      }
     this.getinfo()
    },
  }
</script>

<style scoped lang="less">
  .forwordbox{
    width: 90%;
    display: flex;
    background-color: #f5f5f5;
    .forwordimg{
      width: 125px;
      height: 160px;
      margin-right: 20px;
      img{
        width: 125px;
        height:160px;
      }
    }
    .forwordtext{
      line-height: 160px;
      p{
        margin: 0px;
      }
    }
  }
  .forwordname{
    color: #2e8ded;
    padding-right: 10px;
  }
  .imgbox{
    width:60%;
    height: auto;
  }
  .alertimg{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 101;
    background-color: rgba(0,0,0,0.5);
    display: none;
    overflow-x: hidden;
    overflow-y: scroll;
    #imgdiv{
      width:50%;
      margin-top: 60px;
      z-index: 103;
      margin-left: 25%;
    }
  }
  .alertimg::-webkit-scrollbar {
    display: none;
  }
  .trendsp{
    display: inline-block;
    margin: 10px 0px;
    font-size: 14px;
  }
  .toptext{
    width: 70%;
    line-height: 1.5em
  }
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
            width:96%;
            margin-left:2%;
            min-height: 600px;
            margin-top:30px;
            .show_table_one{
              width: 100%;
              height:auto;
              min-height: 320px;
              outline: 1px solid #e4e4e4;
              .top_box{
                display: flex;
                width: 100%;
                padding-top: 20px;
                div{
                  width: 50%;
                  display: flex;
                  .show_btn{
                    width: 60px;
                    height: 30px;
                    line-height: 30px;
                    margin-top: 5px;
                    margin-right: 20px;
                    border-radius: 3px;
                    p{
                      font-size: 14px;
                      width: 100%;
                      text-align: center;
                      margin: 0px;
                    }
                  }
                   img{
                     width: 40px;
                     height:40px;
                     border-radius: 40px
                   }
                }
              }
              .show_content{
                width: 98%;
                margin-left: 2%;
                margin-top: 20px;
                min-height: 200px;
                .show_img{
                  width:25%;
                  height: 160px;
                  margin-right: 20px;
                  margin-bottom: 20px;
                }
                p{
                  font-size: 14px;
                }
              }
            }
            .advert_num{
              font-size: 14px;
              span{
                color: #2e8ded;
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
  .show_btn{
    div{
      cursor: pointer;
    }
  }
  .trenstable{
    padding-bottom: 20px;
  }
</style>
