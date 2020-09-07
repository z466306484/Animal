<template>
  <div class="container" v-if="showpage"   :style="'min-height:'+ mincht">
    <leftnav></leftnav>
    <div class="rightbox">
      <div class="topbox">
        <topnav></topnav>
      </div>
      <!--首页内容-->
      <div class="content">
        <div class="listbox">
          <div class="listbox_title">
            用户详情<el-button size="small" class="return_list" @click="returnback()" >返回列表</el-button>
          </div>
          <div class="show_table">
             <!--展示-->
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="基本信息" name="first">
                <div class="first_show">
                  <div class="show_table_list">
                    <div class="list_one"><p>用户名</p></div>
                    <div><p>{{showData.nickname}}</p></div>
                  </div>
                  <div class="show_table_list">
                    <div class="list_one"><p>头像</p></div>
                    <div><img class="show_img" :src="showData.photos" alt=""></div>
                  </div>
                  <div class="show_table_list">
                    <div class="list_one"><p>性别</p></div>
                    <div><p v-if="showData.user_sex==1">男</p><p v-if="showData.user_sex==2">女</p></div>
                  </div>
                  <div class="show_table_list">
                    <div class="list_one"><p>微信OPENID</p></div>
                    <div><p>{{showData.openid}}</p></div>
                  </div>
                  <div class="show_table_list">
                    <div class="list_one"><p>单位</p></div>
                    <div><p>{{showData.user_company}}</p></div>
                  </div>
                  <div class="show_table_list">
                    <div class="list_one"><p>职位</p></div>
                    <div><p>{{showData.user_occupation}}</p></div>
                  </div>
                  <div class="show_table_list">
                    <div class="list_one"><p>所在城市</p></div>
                    <div><p>{{showData.user_city}}</p></div>
                  </div>
                  <div class="show_table_list">
                    <div class="list_one"><p>手机号码</p></div>
                    <div><p>{{showData.user_phone}}</p></div>
                  </div>
                  <div class="show_table_list">
                    <div class="list_one"><p>状态</p></div>
                    <div>
                      <p v-if="showData.status==0">正常</p>
                      <p v-if="showData.status==1">正常</p>
                    </div>
                  </div>
                  <div class="show_table_list">
                    <div class="list_one"><p>加入时间</p></div>
                    <div><p>{{showData.ctime}}</p></div>
                  </div>
              <!--    <div class="show_table_list">
                    <div class="list_one"><p>最近登录时间</p></div>
                    <div><p>{{showData.ltime}}</p></div>
                  </div>
                  <div class="show_table_list" v-if="this.title==2">
                    <div class="list_one"><p>禁用时间</p></div>
                    <div><p>{{showData.jtime}}</p></div>
                  </div>-->
                </div>
              </el-tab-pane>
              <el-tab-pane label="TA的数据" name="second">
                <div class="second_show">
                  <div class="show_table_list">
                    <div class="list_one"><p>TA的动态</p></div>
                    <div><p style="color: #2E2D3C">{{showData.dynamic_number}}</p></div>
                  </div>
                  <div class="show_table_list">
                    <div class="list_one"><p>资料评论</p></div>
                    <div><p style="color: #2E2D3C">{{showData.comment_number}}</p></div>
                  </div>
                  <div class="show_table_list">
                    <div class="list_one"><p>动态留言</p></div>
                    <div><p style="color: #2E2D3C">{{showData.message_number}}</p></div>
                  </div>
                  <div class="show_table_list" v-if="this.title==1">
                    <div class="list_one"><p>创建社群</p></div>
                    <div><p style="color: #2E2D3C">{{showData.user_establish_number}}</p></div>
                  </div>
                  <div class="show_table_list" v-if="this.title==1">
                    <div class="list_one"><p>加入社群</p></div>
                    <div><p style="color: #2E2D3C">{{showData.user_join_number}}</p></div>
                  </div>
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

  export default {
    components: {leftnav,topnav},
    data() {
      return {
        mincht:'',
        activeName: 'first',
        title:'',
        searchid:'',
        showData:'',
        showpage:false

      }
    },
    props: {},
    methods: {
      handleClick(tab, event) {

      },
      getinfo(){
        // 请求当前页面数据
        let _this=this
        if(this.title==1){
          this.axios.post(this.apis+'/san/User/ajax_sel', {
            id:this.searchid,
          }).then((res) => {
            if(res.data.code=10000){
              this.showData=res.data.data
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
          this.axios.post(this.apis+'/san/User/ajax_selno', {
            id:this.searchid,
          }).then((res) => {
            if(res.data.code=10000){
              this.showData=res.data.data
              _this.showpage=true
            }
            if(res.data.code==10008){
              _this.$router.push({path:'/san_login'})
            }
          })
            .catch(function (err) {
            })
        }
      },
      returnback(){
        this.$router.go(-1)
      }
    },
    mounted(){
      this.mincht = (this.docheight )  +'px'
    },
    created() {
      document.title = '用户详情'
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
          min-height: 400px;
          background-color: white;
          .show_table{
            width: 60%;
            margin-left:10%;
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
    width:70%;
    min-height: 500px;
    margin-top: 20px;
    .show_table_list{
      display: flex;
      font-size: 14px;
      div{
        p{
          margin-top: 10px;
          margin-bottom: 10px;
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
    width:70%;
    margin-left: 10%;
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
  .a_style{
    text-decoration: none;
    color: #409eff;
  }
</style>
