<template>
  <div class="container" :style="'min-height:'+mincht" v-if="showdata">
    <div class="c_top">
      <div class="c_topbox">
        <div class="cimgbox"><img :src="alldata.community_pic"></div>
        <div class="cinfo">
          <div class="ctitle">{{alldata.name}}</div>
          <div class="cuser">
            <div class="cname">创建人:</div>
            <div class="cval1">{{alldata.user_name}}</div>
          </div>
          <div class="cuser">
            <div class="cname">创建时间:</div>
            <div class="cval">{{alldata.ctime}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="c_under">{{alldata.introduction}}</div>
  </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
              mincht:'',
              community_id:'',
              alldata:'',
              showdata:false,
            }
        },
        props: {},
        methods: {
          getdata(){
            let _this = this
            let url = this.apis+'/wx/Community/community_selinc'
            let data = {
              community_id:this.community_id
            }
            console.log(data,'data')
            console.log(url,'url')
            this.axios.post(url,data).then(function (res) {
              if(res.data.code == 10000){
                console.log(res.data)
                _this.alldata = res.data.data
                _this.showdata = true
              }
            })
          }
        },
        mounted(){
          this.mincht = window.screen.height+'px'
        },
        created() {
          document.title = '社群简介'
          if(this.$route.query.id){
            this.community_id = this.$route.query.id
          }
          this.getdata()
        },
    }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    background-color: rgb(245,245,245);
    .c_top{
      width: 100%;
      padding:0 4%;
      background-color: #fff;
      box-sizing: border-box;
      .c_topbox{
       padding: 15px 0;
       border-bottom: 1px solid #eee;
        display: flex;
        flex-direction: row;
        .cimgbox{
          width: 75px;
          height: 75px;
          border-radius: 10px;
          overflow: hidden;
          background-color: #fff;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .cinfo{
          flex: 1;
          margin-left: 10px;
          height: 75px;
          .ctitle{
            font-size: 1.1em;
            margin-bottom: 15px;
          }
          .cuser{
            display: flex;
            font-size: 1rem;
            margin-bottom: 7px;
            color: rgb(150,150,150);
            .cval1{
              color: rgb(47,157,245);
            }
            .cname{
              margin-right: 10px;
            }
          }
        }
      }
    }
    .c_under{
      padding: 15px 4%;
      font-size: 0.9rem;
      color: rgb(50,50,50);
      background-color: #fff;
    }
  }
</style>
