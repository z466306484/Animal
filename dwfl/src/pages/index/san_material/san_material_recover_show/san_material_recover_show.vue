<template>
  <div class="container"  v-if="showpage"  :style="'min-height:'+ mincht">
    <leftnav></leftnav>
    <div class="rightbox">
      <div class="topbox">
        <topnav></topnav>
      </div>
      <!--首页内容-->
      <div class="content">
        <div class="listbox">
          <div class="listbox_title">
            资料详情<el-button class="return_list" size="small" @click="returnback()">返回列表</el-button>
          </div>
          <div class="show_table" >
            <div class="show_table_list">
              <div class="list_title"><p>{{showData.name}}</p></div>
            </div>
            <!--<div class="show_table_list">
              <div style="margin-left: 11%;margin-bottom: 20px;margin-right:10%;font-size: 12px"><p><span style="color: #2e8ded">admin</span>发布于  2019-02-25  12:45:15</p></div>
              <div v-if="this.title=='remarterial'"><p style="font-size: 12px"><span style="color: #2e8ded">admin</span>删除于  2019-02-25  12:45:15</p></div>
            </div>-->
            <!--内容-->
            <div class="show_table_list">
              <div class="list_one"><p>所属分类</p></div>
              <div><p>{{showData.cate_name}}</p></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>资料封面</p></div>
              <div><img class="show_img" :src="showData.covers_pic" alt=""></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>资料内容</p></div>
              <div style="width: 80%">
                <p v-if="showData.content" v-html="showData.content"></p>
                <p v-if="!showData.content">无</p>
              </div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>其他文档</p></div>
              <div>
                <p v-if="showData.file_name">{{showData.file_name}}</p>
                <p v-if="!showData.file_name">无</p>
              </div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>阅读数</p></div>
              <div><p>{{showData.views}}</p></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>点赞数</p></div>
              <div><p>{{showData.dz}}</p></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>收藏数</p></div>
              <div><p>{{showData.sc}}</p></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>评论数</p></div>
              <div><p style="color: #2e8ded">{{showData.pl}}</p></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>是否推荐</p></div>
              <div><p v-if="showData.is_top==0">不推荐</p><p v-if="showData.is_top==1">推荐</p></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>状态</p></div>
              <div><p v-if="showData.status==0">回收站</p><p v-if="showData.status==1">显示</p><p v-if="showData.status==2">隐藏</p></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>排序</p></div>
              <div><p>{{showData.sort}}</p></div>
            </div>
            <div style="height: 60px"></div>
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
        showpage:false,
        showData:[]
      }
    },
    props: {},
    methods: {
      getinfo(){
        // 请求当前页面数据
        let _this=this
        if(this.title==1){
          this.axios.post(this.apis+'/san/Material/ajax_details', {
            article_id:this.searchid,
          }).then((res) => {
            if(res.data.code==10000){
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
        if(this.title==2){ //回收站查看
          this.axios.post(this.apis+'/san/Material/ajax_details', {
            article_id:this.searchid,
          }).then((res) => {
            if(res.data.code==10000){
              _this.showpage=true
              this.showData=res.data.data
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
    created() {
      document.title = '资料详情'
      if(this.$route.query.type){
        this.title=this.$route.query.type
        this.searchid=this.$route.query.id
      }
      this.getinfo();
    },
    mounted(){
      this.mincht = (this.docheight)  +'px'
    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getinfo'
    }

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
          .show_table{
            width: 70%;
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
                }
                .show_img{
                  width: 160px;
                  height: 110px;
                  margin-top: 15px;
                }
              }
              .list_one{
                width:15%;
                margin-left: 4%;
                font-weight: 600;
                text-align: right;
                margin-right:40px;
                color: #333333;
              }
              .list_title{
                width: auto;
                text-align: left;
                margin-left: 11%;
                color: #333333;
                font-weight: 600;
                font-size: 16px;
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

</style>
