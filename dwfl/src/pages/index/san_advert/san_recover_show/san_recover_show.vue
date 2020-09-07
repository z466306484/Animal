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
            广告详情<el-button class="return_list" size="small" @click="returnback()" >返回列表</el-button>
          </div>
          <div class="show_table">
            <div class="show_table_list">
              <div class="list_one"><p>广告名称</p></div>
              <div><p>{{showData.name}}</p></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>位置</p></div>
              <div><p>{{showData.position}}</p></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>封面</p></div>
              <div><img class="show_img" :src="showData.covers_pic" alt=""></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>链接</p></div>
              <div><p>{{showData.link}}</p></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>排序</p></div>
              <div><p>{{showData.sort}}</p></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>状态</p></div>
              <div><p v-if="showData.status==1">启用</p><p v-if="showData.status==0">禁用</p></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>发布时间</p></div>
              <div><p>{{showData.ctime}}</p></div>
            </div>
            <!--  <div class="show_table_list">
                <div class="list_one"><p>发布人</p></div>
                <div><p>{{showData.ctime}}</p></div>
              </div>-->
            <div class="show_table_list">
              <div class="list_one"><p>删除时间</p></div>
              <div><p>2018-02-15 15:45:15</p></div>
            </div>
            <div class="show_table_list">
              <div class="list_one"><p>发布人</p></div>
              <div><p>admin</p></div>
            </div>
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
        showid:'',
        showData:'',
        showpage:false
      }
    },
    props: {},
    methods: {
      returnback(){
        this.$router.go(-1)
      }, // init数据
      getinfo(){
        // 请求当前页面数据
        let _this=this
        this.axios.post(this.apis+'/san/Advertisement/ajax_list', {
          ad_id:this.showid,
        }).then((res) => {
          if(res.data.code==10000){
            _this.showData=res.data.data
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
      this.mincht = (this.docheight)  +'px'
    },
    created() {
      document.title = '广告详情'
      if(this.$route.query.id){
        this.showid=this.$route.query.id
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
            width: 60%;
            margin-left:10%;
            min-height: 500px;
            margin-top: 50px;
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
                font-weight: 600;
                text-align: right;
                margin-right:40px;
                color: #333333;
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
